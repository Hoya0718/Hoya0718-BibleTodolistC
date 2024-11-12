import React from 'react';
import { Link } from 'react-router-dom';

import "./Login.css"

const Login = () => {
    return (
        <div>
            <div className="container">
                <Link to="/">
                    <div className="back-arrow">←</div>
                </Link>
                <h1>로그인</h1>

                <label for="id">아이디</label>
                <input type="text" id="id" placeholder="아이디을 입력해주세요." />

                <label for="password">비밀번호</label>
                <input type="password" id="password" placeholder="비밀번호를 입력해주세요." />

                <button className="login-btn" disabled="">로그인</button>

                <div className="link-group">
                    <a href="#">아이디 찾기</a>
                    <span>|</span>
                    <a href="#">비밀번호 찾기</a>
                    <span>|</span>
                    <a href="#">회원가입</a>
                </div>

                <div className="separator">간편 로그인</div>

                <button className="social-login-btn kakao"><img src="/img/카카오.png" />카카오로 로그인</button>
                <button className="social-login-btn naver"><img src="/img/naver.png" />네이버로 로그인</button>
                <button className="social-login-btn google"><img src="/img/gogle.png" /><p>구글로 로그인</p></button>
            </div>
        </div>
    )
}

export default Login;