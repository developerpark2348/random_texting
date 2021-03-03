import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fbase';

function Auth(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if(name==="password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            if(newAccount){
                await authService.createUserWithEmailAndPassword(
                    email, password
                );
            }else{
                await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
        } catch(error){
            setError(error.message);
        }
    }

    const toggleAccount = () => {
        setNewAccount(prev => !prev);
    }

    const onSocialClick = async (event) => {
        let provider;
        provider = new firebaseInstance.auth.GoogleAuthProvider();
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return(
        <div>
            <div>{newAccount ? "회원가입창입니다." : "로그인창입니다."}</div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text" 
                    placeholder="Email"
                    onChange={onChange}
                    value={email} 
                    required 
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    onChange={onChange}
                    value={password}
                    required 
                    />
                <input 
                    type="submit" 
                    value=
                    {newAccount 
                    ? "회원가입" 
                    : "로그인"} 
                />
                {error}
            </form>
            <div>
                <button 
                    onClick={onSocialClick} 
                    name="google">
                    Continue With Google
                </button>
                <button
                    onClick={toggleAccount}> 
                    {newAccount 
                        ? "로그인창으로" 
                        : "회원가입창으로"
                    }
                </button>
            </div>
        </div>
    )
}

export default Auth;