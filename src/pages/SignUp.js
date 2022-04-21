import '../styles/signUp.css'
import {useRef, useState} from "react"

import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'



const SignUp = () => {
    const emailRef=useRef(null)
    const passwordRef=useRef(null)

    const register = async e => {
        e.preventDefault()

        const email=emailRef.current.value
        const password=passwordRef.current.value

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
        }catch (e){
            console.log(e.message)
        }
    }


    const signIn = async e =>{
        e.preventDefault()

        const email=emailRef.current.value
        const password=passwordRef.current.value

        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
        }catch(e){
            console.log(e.message)
        }

    }

    return (
        <div className='signUp'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder='Emal'/>
                <input ref={passwordRef} type="password" placeholder='Password'/>
                <button type='submit' onClick={(e) => signIn(e)}>Sign In</button>

                <h4>
                    <span className="signUp_gray">New to Netflix? </span>
                     <span className='signUp_link' onClick={(e) => register(e)}>Sign up now.</span>
                </h4>
            </form>
        </div>
    );
};

export default SignUp;
