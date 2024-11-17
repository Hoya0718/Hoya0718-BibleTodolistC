import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        id: "",
        pw: ""
    });

    const navigate = useNavigate();  // useNavigate 훅을 사용하여 navigate 함수 가져오기

    // 입력값이 변경될 때마다 상태를 업데이트하는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;  // 입력 필드의 name과 value를 가져옴

        setLoginInfo({
            ...loginInfo,  // 기존의 loginInfo 상태를 복사
            [name]: value  // 동적으로 필드 이름에 맞게 값을 업데이트
        });
    };

    // 폼 제출 시 호출되는 함수
    const handleSubmit = (e) => {
        e.preventDefault();  // 폼 제출 시 페이지 리로드 방지

        // 서버에 로그인 정보 전송
        fetch("/api/loginProc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",  // 요청 헤더 설정
            },
            body: JSON.stringify(loginInfo)  // 로그인 정보를 JSON 형태로 변환하여 요청 본문에 담음
        })
            .then((res) => res.json())  // 서버 응답을 JSON으로 처리
            .then((res) => {
                console.log(res);

                // 로그인 성공 시 메인 페이지로 이동
                if (res.message === "success") {  // 서버에서 성공 응답을 받았을 때
                    navigate("/basic");  // 메인 페이지로 이동
                } else {
                    // 실패한 경우 예외 처리 (예: 알림 표시)
                    alert("로그인 실패. 다시 시도해주세요.");
                }

            })
            .catch((error) => {
                console.error("로그인 오류:", error);  // 오류 처리
            });
    };

    return (
        <div>
            <div className="container">
                <Link to="/">
                    <div className="back-arrow">←</div>
                </Link>
                <h1>로그인</h1>

                <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        placeholder="아이디를 입력해주세요."
                        name="id"
                        value={loginInfo.id}
                        onChange={handleChange}  // 입력값이 변경될 때마다 handleChange 호출
                    />

                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력해주세요."
                        name="pw"
                        value={loginInfo.pw}
                        onChange={handleChange}  // 입력값이 변경될 때마다 handleChange 호출
                    />
                    <button type="submit" className="login-btn">로그인</button>
                </form>

                <div className="link-group">
                    <a href="#">아이디 찾기</a>
                    <span>|</span>
                    <a href="#">비밀번호 찾기</a>
                    <span>|</span>
                    <a href="#">회원가입</a>
                </div>

                <div className="separator">간편 로그인</div>
                {/*
                <button className="social-login-btn kakao">
                    <img src="/img/카카오.png" alt="카카오 로그인" />카카오로 로그인
                </button>
                <button className="social-login-btn naver">
                    <img src="/img/naver.png" alt="네이버 로그인" />네이버로 로그인
                </button>
                <button className="social-login-btn google">
                    <img src="/img/google.png" alt="구글 로그인" /><p>구글로 로그인</p>
                </button>
                */}
            </div>
        </div>
    );
};

export default Login;
