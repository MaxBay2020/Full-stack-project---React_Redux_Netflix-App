import '../styles/Navbar.css'
import {useEffect, useState} from 'react'

const Navbar = () => {
    const [show, setShow] = useState(false)

    const transitionNavBar = () =>{
        window.scrollY > 100 ? setShow(true) : setShow(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)
        return () => {
            window.removeEventListener('scroll', transitionNavBar)
        };
    }, []);


    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <div className='nav_contents'>
                <img
                    className='nav_logo'
                    src='https://www.freepnglogos.com/uploads/netflix-logo-0.png'
                    alt="logo"/>
                <img
                    className='nav_avatar'
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBj8tmsufgbgjBRaAhTb2a7O7uTamgQxzfivTGcTwjlmCDZbpLYlPHvoBiZdrbPtAUmI&usqp=CAU"
                    alt="avatar"/>
            </div>

        </div>
    );
};

export default Navbar;
