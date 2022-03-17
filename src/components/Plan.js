import '../styles/Plan.css'
import {useEffect, useState} from "react";
import {db} from "../firebase/firebase"
import { collection, query, where, getDocs, onSnapshot, addDoc } from "firebase/firestore"
import {useSelector} from "react-redux";

const Plan = () => {
    const [products, setProducts] = useState([])
    const user = useSelector(state => state.user.user)

    const [subscription, setSubscription] = useState(null)

    useEffect(async () => {
        const allDocs = await getDocs(query(collection(db, `customers/${user.uid}/subscriptions`)))
        allDocs.forEach(doc => setSubscription({
            role: doc.data().role,
            current_period_end: doc.data().current_period_end.seconds,
            current_period_start: doc.data().current_period_start.seconds
        }))
    }, [user.uid]);

    useEffect( async () => {
        const products = await getAllProducts()
        setProducts(products)
    }, [])

    const getAllProducts = async () => {
        // 设置查询语句
        // db是firebase store数据库， products是数据库中的集合名称
        const myQuery = query(collection(db, 'products'),
            where('active', '==', true ))

        // 根据查询语句查找所有符合条件的数据
        const allProducts = await getDocs(myQuery)

        // 声明一个对象，之后要将每个product的信息放在这个对象中
        const products = {}

        // 遍历所有符合条件的数据，拿到每一条数据
        allProducts.forEach(  product => {
            // 将每个product的信息，存储到products对象中
            products[product.id] = product.data()

            // 之后，因为每个product中又有prices这个子集合
            // 我们还要将这个子集合中的数据也添加到products对象中
            // 设置查询语句，因为是product的内部子集合的查询，因此这里注意使用了ref关键字，表示内部子集合， 子集合的名称叫prices
            const myQuery = query(collection(product.ref, 'prices'))

            // 因为forEach不允许使用async/await，因此我们使用then/catch来处理这个Promise
            // 根据查询语句找到符合条件的数据
            getDocs(myQuery).then(allPricesOfThisProduct => {
                // 遍历所有符合条件的数据，拿到每一条数据
                allPricesOfThisProduct.forEach(price => {
                    products[product.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            })
        })

        return products
    }

    const loadCheckout = async (priceId) => {
        // 向customers集合中的指定名字的数据中，创建一个子集合叫checkout_sessions
        // 注意！必须起名叫"checkout_sessions"，因为当Firebase中的stripe扩展看到我们添加了一个叫checkout_sessions的集合进去
        // 他就会自动帮我们添加一些东西进去，之后就可以自动跳转到stripe进行支付了
        // 并向这个子集合中添加数据
        const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
            price: priceId,
            // 下面两行代码表示：不管是订阅会员还是取消会员，进行完Stripe支付或确认取消之后都回到这个当前所在的页面
            success_url: window.location.origin, // 也就是当前页面的url，如localhost:3000
            cancel_url: window.location.origin,  // 也就是当前页面的url，如localhost:3000
        })

        // 监控所有的checkout_session
        onSnapshot(docRef, (snap) => {
            // 拿到每个checkout_session
            const { error, url } = snap.data()
            if (error) {
                // 如果这个checkout_session中有error错误
                alert(`An error occurred: ${error.message}`);
            }
            if (url) {
                // 如果这个checkout_session中有url（表示即将跳转的Stripe支付页面），则跳转到支付页面
                window.location.assign(url);
            }
        })
    }


    return (
        <div className='plan'>
            <br/>
            {
               subscription && <p>Renewal Date: {new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>
            }

            {
                // 因为products是一个对象，不能直接使用map，需要使用下面这种方式
                Object.entries(products).map( ([productId, productData]) => {
                    const isCurrentPackage = productData.name?.toLowerCase().includes(subscription.role)

                    return (
                        <div className={`${isCurrentPackage && 'plan_plan_disable'} plan_plan`} key={productId}>
                            <div className="plan_info">
                                <h5>{productData.name}</h5>
                                <h6>{productData.description}</h6>
                            </div>

                            <button className="plan_button"
                                    onClick={() => !isCurrentPackage && loadCheckout(productData?.prices?.priceId)}>
                                {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                            </button>
                        </div>
                    )
            })
            }
        </div>
    )
}

export default Plan;
