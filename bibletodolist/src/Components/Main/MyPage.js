import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const MyPage = () => {

    const [myCommentModal, setMyCommentModal] = useState(false); // 모달 상태
    const [myLoveBibleModal, setMyLoveBibleModal] = useState(false); // 모달 상태
    const [myFeedbackModal, setMyFeedbackModal] = useState(false); // 모달 상태

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('user_role');

        navigate('/');
    }

    // 모달 닫기
    const closeModal = () => {
        setMyCommentModal(false);
        setMyLoveBibleModal(false);
        setMyFeedbackModal(false);
    };

    const myComment = () => {
        setMyCommentModal(true)
        fetch('/api/getMyComment',{
            method: "POST",
            headers : {
                "Content-Type" : "application/json; charset=utf-8"
            },
            body : JSON.stringify()
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    const myLoveBible = () => {
        setMyLoveBibleModal(true)
        fetch('/api/getMyLoveBible',{
            method: "POST",
            headers : {
                "Content-Type" : "application/json; charset=utf-8"
            },
            body : JSON.stringify()
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    const myFeedback = () => {
        setMyFeedbackModal(true)
        fetch('/api/getMyLoveBible',{
            method: "POST",
            headers : {
                "Content-Type" : "application/json; charset=utf-8"
            },
            body : JSON.stringify()
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    return (
        <>
            <ul>
                <li>내가 작성한 은혜나눔 - <button onClick={myComment}>바로가기</button></li>
                <li>내가 좋아요 한 성경 구절 - <button onClick={myLoveBible}>바로가기</button> </li>
                <li>내가 작성한 피드백 - <button onClick={myFeedback}>바로가기</button> </li>
                <button onClick={handleLogout}>로그아웃</button>
            </ul>

            <Modal isOpen={myCommentModal} onRequestClose={closeModal}>
                <button onClick={closeModal}>닫기</button>
                <div>
                    은혜나눔
                </div>
            </Modal>

            <Modal isOpen={myLoveBibleModal} onRequestClose={closeModal}>
                <button onClick={closeModal}>닫기</button>
                <div>
                   좋아요
                </div>
            </Modal>

            <Modal isOpen={myFeedbackModal} onRequestClose={closeModal}>
                <button onClick={closeModal}>닫기</button>
                <div>
                   피드백
                </div>
            </Modal>
        </>
    )
}

export default MyPage;