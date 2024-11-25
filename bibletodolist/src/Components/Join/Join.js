import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

import './Join.css';

const Join = () => {

    const [joinInfo, setJoinInfo] = useState({
        id: "",
        pw: "",
        name: "",
        department: "",
        gender: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setJoinInfo({
            ...joinInfo,
            [name]: value
        });
    }

    // 폼 제출 시 호출되는 함수
    const handleSubmit = (e) => {
        e.preventDefault();  // 폼 제출 시 페이지 리로드 방지

        // 서버에 로그인 정보 전송
        fetch("/api/joinProc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",  // 요청 헤더 설정
            },
            body: JSON.stringify(joinInfo)  // 로그인 정보를 JSON 형태로 변환하여 요청 본문에 담음
        })
            .then((res) => res.json())  // 서버 응답을 JSON으로 처리
            .then((res) => {
                console.log(res);
                if(res.message == "success")
                    navigate("/")

            })
            .catch((error) => {
                console.error("회원가입 실패:", error);  // 오류 처리
            });
    };

    return (
        <div>
            <Link to="/">이동하기</Link>
            <br/>
            <span className="joinTitle">간단한 정보를 알려주세요.</span>
            <form className=".form-group" onSubmit={handleSubmit} method="POST">
                <input
                    type="text"
                    id=""
                    name="id"
                    value={joinInfo.id}
                    placeholder="아이디"
                    onChange={handleChange}
                />

                <hr />

                <input
                    type="password"
                    id=""
                    name="pw"
                    value={joinInfo.pw}
                    placeholder="비밀번호"
                    onChange={handleChange}
                />

                <hr />

                <input
                    type="text"
                    id=""
                    name="name"
                    value={joinInfo.name}
                    placeholder="이름"
                    onChange={handleChange}
                />

                <hr />

                <label>
                    <input
                        type="radio"
                        id="교역자"
                        name="department"
                        value="교역자"
                        placeholder="소속"
                        onChange={handleChange}
                    />
                    교역자
                </label>

                <label>
                    <input
                        type="radio"
                        id="부교역자"
                        name="department"
                        value="부교역자"
                        placeholder="소속"
                        onChange={handleChange}
                    />
                    부교역자
                </label>

                <label>
                    <input
                        type="radio"
                        id="장년부"
                        name="department"
                        value="장년부"
                        placeholder="소속"
                        onChange={handleChange}
                    />
                    장년부
                </label>

                <label>
                    <input
                        type="radio"
                        id="청년부"
                        name="department"
                        value="청년부"
                        placeholder="소속"
                        onChange={handleChange}
                    />
                    청년부
                </label>

                <label>
                    <input
                        type="radio"
                        id="대학부"
                        name="department"
                        value="대학부"
                        placeholder="소속"
                        onChange={handleChange}
                    />
                    대학부
                </label>

                <label>
                    <input
                        type="radio"
                        id="중고등부"
                        name="department"
                        value="중고등부"
                        placeholder="소속"
                        onChange={handleChange}
                    />
                    중고등부
                </label>

                <label>
                    <input
                        type="radio"
                        id="초등부"
                        name="department"
                        value="초등부"
                        placeholder="소속"
                        onChange={handleChange}
                    />
                    초등부
                </label>

                <label>
                    <input
                        type="radio"
                        id="어린이부"
                        name="department"
                        value="어린이부"
                        placeholder="소속"
                        onChange={handleChange}
                    />
                    어린이부
                </label>

                <hr />

                <label>
                    <input
                        type="radio"
                        id="남성"
                        name="gender"
                        value="M"
                        onChange={handleChange}
                    />
                    남성
                </label>

                <label>
                    <input
                        className=".radio-group"
                        type="radio"
                        id="여성"
                        name="gender"
                        value="W"
                        onChange={handleChange}
                    />
                    여성
                </label>
                <button className="submit-button" type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default Join;