import React, { useState } from 'react';
import './Main.css';
import { authService, firebaseInstance } from '../fbase';
import { Navbar } from 'react-bootstrap';

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
    }

    return(
        <div className="Auth_body">
            <Navbar className="Nav">
            <img
                className="Nav_img"
                src="../mail.png"
                alt="메일 이미지"
            /> 
            <div className="Nav_title">
                랜텍 - 당신이 작성하는 랜덤 텍스트
            </div>
            </Navbar>
            <div className="Auth_alert">{newAccount ? "회원가입창입니다." : "로그인창입니다."}
            </div>
            <form onSubmit={onSubmit} className="Auth_Submit">
                <div className="Auth_main">
                    <input
                        name="email"
                        type="text" 
                        placeholder="Email"
                        className="Auth_email"
                        onChange={onChange}
                        value={email} 
                        required 
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password"
                        className="Auth_email"
                        onChange={onChange}
                        value={password}
                        required 
                    />
                </div>
                <input 
                    type="submit"
                    className="Auth_Login"
                    value=
                    {newAccount 
                    ? "회원가입" 
                    : "로그인"} 
                />
            </form>
            <div className="Auth_Social">
                <button 
                    onClick={onSocialClick} 
                    className="Auth_SocialBtn"
                    name="google">
                    Continue With Google
                </button>
                <button
                    className="Auth_SocialBtn"
                    onClick={toggleAccount}
                > 
                    {newAccount 
                        ? "로그인창으로" 
                        : "회원가입하기"
                    }
                </button>
            </div>
            <div className="Auth_footer">
                &copy; Copyright 2021 Developer Park
            </div>
        </div>
    )
}

export default Auth;