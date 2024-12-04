import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ProgressBar from "./ProgressBar";

const MyPage = () => {

    const [myCommentModal, setMyCommentModal] = useState(false); // 모달 상태
    const [myLoveCommentModal, setMyLoveCommentModal] = useState(false); // 모달 상태
    const [myLoveBibleModal, setMyLoveBibleModal] = useState(false); // 모달 상태
    const [myFeedbackModal, setMyFeedbackModal] = useState(false); // 모달 상태

    const [comments, setComments] = useState([])
    const [loveComments, setLoveComments] = useState([])
    const [bibles, setBibles] = useState([])
    const [feedbacks, setFeedbacks] = useState([])
    const [lists, setLists] = useState([]);
    const [listsCheck, setListsCheck] = useState([])
 
    const navigate = useNavigate();

    const user_id = sessionStorage.getItem("user_id")

    const handleLogout = () => {
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('user_role');
        sessionStorage.removeItem('user_name');
        sessionStorage.removeItem('user_picture');

        navigate('/');
    }

    // 모달 닫기
    const closeModal = () => {
        setMyCommentModal(false);
        setMyLoveCommentModal(false);
        setMyLoveBibleModal(false);
        setMyFeedbackModal(false);
    };

    const myComment = (user_id) => {
        setMyCommentModal(true)
        fetch('/api/getMyComment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ user_id: user_id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setComments(data);
            })
    }

    const myLoveComment = (user_id) => {
        setMyLoveCommentModal(true)
        fetch('/api/myLoveComment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ user_id: user_id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLoveComments(data);
            })
    }

    const myLoveBible = (user_id) => {
        setMyLoveBibleModal(true)
        fetch('/api/getMyLoveBible', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ user_id: user_id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBibles(data);
            })
    }

    const myFeedback = (user_id) => {
        setMyFeedbackModal(true)
        fetch('/api/getMyFeedback', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ user_id: user_id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setFeedbacks(data);
            })
    }

    // Date formatting helper function
    const formatDate = (dateString) => {
        // dateString이 문자열인지 확인
        if (typeof dateString === 'string') {
            // ' '을 'T'로 바꾸어 ISO 형식으로 변환
            dateString = dateString.replace(" ", "T");
        }

        // Date 객체로 변환
        const date = new Date(dateString);

        // 날짜가 유효한지 확인 (Invalid Date 처리)
        if (isNaN(date.getTime())) {
            return 'Invalid Date'; // 유효하지 않은 날짜
        }
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }


    const testament = async (value, user_id) => {
        try {
            // 첫 번째 fetch 요청
            const jsonTestament = { testament: value };
            const res1 = await fetch(`/api/getBibleTestament`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(jsonTestament), // json 형식인 jsonObject를 서버로
            });

            // 첫 번째 요청의 응답을 JSON으로 변환
            const data = await res1.json();
            console.log("첫 번째 fetch 결과:", data);

            // 받은 데이터를 setLists로 상태에 저장
            setLists(data);

            // 두 번째 fetch 요청: 첫 번째 요청의 결과(data)와 user_id를 전송
            const jsonCheckBible = { lists:data, user_id };
            const res2 = await fetch('/api/bible/checkBible', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(jsonCheckBible),
            });

            // 두 번째 요청의 응답을 JSON으로 변환
            const result = await res2.json();
            console.log("두 번째 fetch 결과:", result);
            setListsCheck(result);
        } catch (error) {
            // 에러 처리
            console.error("Error fetching data:", error);
        }
    };


    return (
        <>
            <div>{user_id}님의 페이지</div>
            <div>
                <button value="구약" onClick={() => testament("구약", user_id)}>구약</button> | <button value="신약" onClick={() => testament("신약", user_id)}>신약</button>
                <div>진행률</div>
                <ul>
                    {lists.map((list, index) => (
                        <li key={index}>{list} : <ProgressBar progress = {listsCheck[index]}/></li>
                        
                    ))}
                </ul>
            </div>
            <ul>
                <li>내가 작성한 은혜나눔 - <button onClick={() => myComment(user_id)}>바로가기</button></li>
                <li>내가 좋아요 한 은혜나눔 - <button onClick={() => myLoveComment(user_id)}>바로가기</button></li>
                <li>내가 좋아요 한 성경 구절 - <button onClick={() => myLoveBible(user_id)}>바로가기</button> </li>
                <li>내가 작성한 피드백 - <button onClick={() => myFeedback(user_id)}>바로가기</button> </li>
                <button onClick={handleLogout}>로그아웃</button>
            </ul>

            <Modal isOpen={myCommentModal} onRequestClose={closeModal}>
                <button onClick={closeModal}>닫기</button>
                <div>
                    은혜나눔
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>{comment.comment} | {formatDate(comment.creation_date)}</li>
                        ))}
                    </ul>
                </div>
            </Modal>

            <Modal isOpen={myLoveCommentModal} onRequestClose={closeModal}>
                <button onClick={closeModal}>닫기</button>
                <div>
                    좋아요 한 은혜나눔
                    <ul>
                        {loveComments.map((loveComment, index) => (
                            <li key={index}>{loveComment.comment} | {formatDate(loveComment.creation_date)}</li>
                        ))}
                    </ul>
                </div>
            </Modal>

            <Modal isOpen={myLoveBibleModal} onRequestClose={closeModal}>
                <button onClick={closeModal}>닫기</button>
                <div>
                    좋아요
                    <ul>
                        {bibles.map((bible, index) => (
                            <li key={index}> {bible.LIST} | {bible.chapter} | {bible.verse} | {bible.content}</li>
                        ))}
                    </ul>
                </div>
            </Modal>

            <Modal isOpen={myFeedbackModal} onRequestClose={closeModal}>
                <button onClick={closeModal}>닫기</button>
                <div>
                    피드백
                    <ul>
                        {feedbacks.map((feedback, index) => (
                            <li key={index}> {feedback.title} | {feedback.suggest} | {formatDate(feedback.feedback_date)}</li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </>
    )
}

export default MyPage;