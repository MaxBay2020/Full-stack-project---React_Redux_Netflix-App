import '../styles/Profile.css'
import Navbar from "../components/Navbar";
import {useSelector} from "react-redux";
import {auth} from "../firebase/firebase"
import { signOut } from "firebase/auth"


const Profile = () => {
    const user = useSelector(state => state.user.user)



    return (
        <div className='profile'>
            <Navbar />
            <div className="profile_body">
                <h1>Edit Profile</h1>
                <div className="profile_info">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBj8tmsufgbgjBRaAhTb2a7O7uTamgQxzfivTGcTwjlmCDZbpLYlPHvoBiZdrbPtAUmI&usqp=CAU"
                         alt="profile"/>
                    <div className="profile_details">
                        <h2>{user.email}</h2>
                        <div className="profile_plans">
                            <h3>Plans</h3>
                            <button className='profile_signOut' onClick={() => signOut(auth)}>Sign Out</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
