import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContinueReading = () => {
    const navigate = useNavigate();  // 페이지 네비게이션을 위한 useNavigate 훅 사용
    const userId = sessionStorage.getItem("user_id");  // 세션에서 user_id 가져오기

    useEffect(() => {
        // API 호출
        fetch('/api/getLastReading', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                user_id: userId
            })
        })
            .then(res => res.json())
            .then(data => {
                navigate('/basic/bible', { state: { list: data.list, chapter: data.chapter, verse: data.verse } });
            })
    })


    return (
        <>
            <div>
                {/* 컴포넌트에서 특별한 렌더링할 내용은 없으므로 비워둠 */}
            </div>
        </>
    );
};

export default ContinueReading;
