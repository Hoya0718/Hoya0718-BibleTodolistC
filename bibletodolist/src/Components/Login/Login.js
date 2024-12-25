import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        user_id: "",
        user_pw: ""
    });

    const [user, setUser] = useState(null);  // 사용자 정보 상태
    const [isLoading, setIsLoading] = useState(false);  // 로딩 상태
    const navigate = useNavigate();

    // OAuth2 로그인 처리 서버에서 처리 후 반납
    const OAuth2Login = (provider) => {
        window.location.href = `http://btl.nayo.kr/oauth2/authorization/${provider}`;
    }

const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo({
        ...loginInfo,
        [name]: value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);  // 로그인 시작 시 로딩 상태 설정

    fetch("/api/loginProc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(loginInfo)
    })
        .then((data) => data.json())
        .then((data) => {
            if (data.user_id === loginInfo.user_id) {
                sessionStorage.setItem("user_id", data.user_id);
                sessionStorage.setItem("user_role", data.user_role);
                navigate("/basic");
            } else {
                alert("로그인 실패. 다시 시도해주세요.");
            }
        })
        .catch((error) => {
            console.error("로그인 오류:", error);
            alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
        })
        .finally(() => setIsLoading(false));  // 로그인 종료 후 로딩 상태 해제
};

return (
    <div>
        <div className="container">
            <h1>로그인</h1>

            <form onSubmit={handleSubmit} method="POST">
                <label htmlFor="id">아이디</label>
                <input
                    type="text"
                    id="id"
                    placeholder="아이디를 입력해주세요."
                    name="user_id"
                    value={loginInfo.user_id}
                    onChange={handleChange}
                />

                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요."
                    name="user_pw"
                    value={loginInfo.user_pw}
                    onChange={handleChange}
                />
                <button type="submit" className="login-btn">
                    {isLoading ? "로그인 중..." : "로그인"}
                </button>  {/* 로딩 상태 표시 */}
            </form>

            <div className="separator">간편 로그인</div>

            {/* <button className="social-login-btn kakao" onClick={() => OAuth2Login("kakao")}>
                <img src="/img/카카오.png" alt="카카오 로그인" />카카오로 로그인
            </button> */}
            <button className="social-login-btn naver" onClick={() => OAuth2Login("naver")}>
                <p>네이버로 로그인</p>
            </button>
            <button className="social-login-btn google" onClick={() => OAuth2Login("google")}>
                <p>구글로 로그인</p>
            </button>
        </div>
    </div>
);
};

export default Login;
