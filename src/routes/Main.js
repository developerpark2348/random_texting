import React from 'react';
import './Main.css';
import { Navbar } from 'react-bootstrap';
import { authService } from '../fbase';

function Main() {

    const LogOut = () => {
        authService.signOut();
    }
    

return (
    <div className="body">
        <Navbar className="header">
            <div className="header_text">추천1등 ~ 추천2등 ~</div>
            <button className="header_LogoutBtn" onClick={LogOut}>로그아웃</button>
            <button className="header_KakaoBtn" onClick={LogOut}>공유하기</button>
        </Navbar>
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
        <div className="Main">
            <div className="Main_balloon">
                <div className="balloon">
                    <div className="balloon_text">
                        파이어베이스에서 꺼내오는 랜덤 텍스트1
                    </div>
                </div>
                <div className="Main_thumb">
                    <button className="Main_thumb_Btn">추천</button>
                    <div className="Main_thumb_num">
                        추천 수 : 0
                    </div>
                </div>
            </div>
        </div>
        <div className="Input">
            <input type="text" className="Input_input"placeholder="랜덤 텍스트를 작성해주세요!"/>
            <button className="Input_Btn" placeholder="입력하기" />
        </div>
    </div>
    );
}

export default Main;
