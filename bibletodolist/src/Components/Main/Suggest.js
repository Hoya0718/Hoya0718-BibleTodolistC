import React, { useState } from 'react';

const Suggest = () => {
    const userId = sessionStorage.getItem("user_id")
    // 하나의 상태 객체로 title과 suggest 관리
    const [feedback, setFeedback] = useState({ title: '', suggest: '', user_id: userId });

    // 제목 입력 변경 시 상태 업데이트
    const handleTitleChange = (e) => {
        setFeedback({ ...feedback, title: e.target.value });
    };

    // 내용 입력 변경 시 상태 업데이트
    const handleSuggestChange = (e) => {
        setFeedback({ ...feedback, suggest: e.target.value });
    };

    // 폼 제출 시 호출되는 함수
    const formSuggest = () => {
        // feedback 객체를 서버로 보내기
        fetch("/api/postSuggest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(feedback),
        })
        window.alert("피드백 감사합니다.");
        window.location.href='/basic';
    };

    return (
        <>
            <div>
                제목 입력:
                <input
                    type="text"
                    name="title"
                    value={feedback.title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                내용 입력:
                <input
                    type="text"
                    name="suggest"
                    value={feedback.suggest}
                    onChange={handleSuggestChange}
                />
            </div>
            <div>
                <button onClick={formSuggest}>제안하기</button>
            </div>
        </>
    );
};

export default Suggest;
