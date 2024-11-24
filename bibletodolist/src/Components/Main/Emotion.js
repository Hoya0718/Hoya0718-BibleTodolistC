import React, { useState, useEffect } from 'react';

const Emotion = () => {

  const [getComment, setGetComment] = useState([]);
  const [refresh, setRefresh] = useState(false);  // 상태를 추가하여 좋아요 클릭 시 리렌더링 유도

  useEffect(() => {
    fetch('/api/getComment')
      .then((res) => res.json())
      .then(data => {
        setGetComment(data); // 댓글 목록을 상태에 업데이트
      })
  }, [refresh])

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

  const likeUp = (comment_id) => {
    const userId = sessionStorage.getItem("user_id");

    fetch('/api/likeUp', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        comment_id: comment_id,
        user_id: userId
      })
    }).then(() => {
      // 좋아요가 클릭되면 `refresh` 상태를 갱신하여 useEffect가 다시 실행되도록 한다.
      setRefresh(prev => !prev);  // 상태를 토글하여 useEffect가 다시 실행되게 만듬
    });
  };

  return (
    <>
      <div>
        <ul>
          {getComment.map((comment, index) => (
            <li key={index}>
              <div>작성자 : {comment.user_id}</div>
              <div>내용 {comment.comment} [{comment.like_count}] <button onClick={() => likeUp(comment.comment_id)}>좋아요</button></div>
              <div>작성일 : {formatDate(comment.creation_date)} {/* 날짜 출력 형식 변경 */}</div>
            </li>)
          )}
        </ul>
      </div>
    </>
  )
}
export default Emotion;