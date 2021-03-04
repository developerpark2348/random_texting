import React, { useEffect, useState } from 'react';
import './Main.css';
import { Navbar } from 'react-bootstrap';
import { authService } from '../fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faShare } from '@fortawesome/free-solid-svg-icons';
import { dbService } from '../fbase';

function Main() {

    const [text, setText] = useState("");
    const [texts, setTexts] = useState([]);

    const LogOut = () => {
        authService.signOut();
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("text").add({
            text: text,
            createdAt: Date.now(),
            thumbs: 0
        });
        alert("저장되었습니다!")
        setText("");
    };

    const onChange = (event) => {
        const {target:{value},} = event;
        setText(value);
    }

    const getTexts = async() => {
        const dbtexts = await dbService.collection("text").get()
        dbtexts.forEach((document) => {
            const dbtextsObject = {
                ...document.data(),
                id: document.id,
            }
            setTexts(prev => [dbtextsObject, ...prev]);
        })
    }

    useEffect(()=>{
        getTexts();
    }, [])
    console.log(texts);

return (
    <div className="body">
        <Navbar className="header">
            <div className="header_text">추천1등 ~ 추천2등 ~</div>
            <button className="header_LogoutBtn" onClick={LogOut}>
                <FontAwesomeIcon icon={faSignOutAlt}/>
            </button>
            <button className="header_KakaoBtn">
                <FontAwesomeIcon icon={faShare}/>
            </button>
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
                        {texts.map((texts) => (
                            <div key={texts.id}>
                                <div>{texts.text}</div>
                            </div>
                        ))}
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
        <form className="Input" onSubmit={onSubmit}>
            <input 
                value={text} 
                onChange={onChange} 
                type="text" 
                className="Input_input" 
                placeholder="랜덤 텍스트를 작성해주세요!" 
                maxLength={40}
            />
            <input 
                type="submit" 
                className="Input_Btn" 
                value=""
            />
        </form>
    </div>
    );
}

export default Main;
