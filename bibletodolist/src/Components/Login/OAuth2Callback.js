import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuth2Callback = () => {
    const location = useLocation();  // 현재 URL 정보 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const userId = queryParams.get("userId");  // URL 파라미터에서 userId 값 추출
        const loginInfo = {user_id: userId };

        if (userId) {
            console.log("받은 파라미터 유저 아이디: " + userId);
            // userId가 있다면, 해당 값을 서버로 보내서 사용자 정보를 받아옴
            const fetchUserInfo = async () => {
                try {
                    const response = await fetch("/api/oauth2/user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify(loginInfo),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        sessionStorage.setItem("user_id", data.user_id);
                        sessionStorage.setItem("user_role", data.user_role);
                        navigate("/basic"); // 로그인 성공 시 이동
                    } else {
                        console.error("OAuth2 사용자 정보 가져오기 실패");
                        alert("로그인 실패. 다시 시도해주세요.");
                    }
                } catch (error) {
                    console.error("OAuth2 콜백 오류:", error);
                    alert("로그인 중 오류가 발생했습니다.");
                }
            };

            fetchUserInfo();
        } else {
            console.error("userId 파라미터가 없습니다.");
            alert("로그인 오류: 사용자 정보를 찾을 수 없습니다.");
        }
    }, [location, navigate]); // location과 navigate 변경 시마다 실행

    return <div>로그인 처리 중입니다...</div>;
};

export default OAuth2Callback;
