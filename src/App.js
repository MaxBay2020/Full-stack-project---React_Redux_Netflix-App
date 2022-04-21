import React, {useEffect, useState} from 'react';
import './styles/App.css';
import HomeScreen from "./pages/HomeScreen";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./pages/Login"
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './firebase/firebase'
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "./features/userSlice";
import Profile from "./pages/Profile";


function App() {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                dispatch(login({
                    uid: currentUser.uid,
                    email: currentUser.email,
                }))
            }else{
                dispatch(logout())
            }
        })

        return unsubscribe
    }, [dispatch]);





    return (
    <Router>
        <div className="app" />

        <Routes>
            <Route path='/' element={user?<HomeScreen />:<Login />} />
            <Route path='/profile' element={user?<Profile />:<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
