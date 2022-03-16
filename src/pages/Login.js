import React, {useEffect, useState} from 'react'
import '../styles/login.css'
import SignUp from "./SignUp";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [signIn, setSignIn] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
    }, []);


    return (
        <div className='login'>
            <div className="login_background">
                <img className='login_logo' src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="bg"/>
                <button className='login_button' onClick={() => setSignIn(true)}>Sign in</button>
                <div className="login_gradient" />
            </div>
            <div className="login_body">
                {
                    signIn ? <SignUp />: (
                        <>
                            <h1>Unlimited films, TV programmes and more.</h1>
                            <h2>Watch anywhere. Cancel at any time.</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                            <div className="login_input">
                                <form>
                                    <input type="email" placeholder='Email Address' />
                                    <button className='login_getStarted' onClick={() => setSignIn(true)}>GET STARTED</button>
                                </form>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    );
};

export default Login;
