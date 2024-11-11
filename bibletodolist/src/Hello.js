import React from 'react';
import './Hello.css'

const Hello = () => {
    return (
        <div>
            <div className="container">
                <div> <span id="title">Bible diary</span></div>
                <button className="open-btn">open</button>
                <div className="bottom-buttons">
                    <button className="btn"><span class="icon">👤</span>회원가입</button>
                    <button className="btn"><span class="icon">➡️</span>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default Hello;