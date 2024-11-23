import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const Suggestion = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);  // 로딩 상태
    const [error, setError] = useState(null);  // 에러 상태

    useEffect(() => {
        fetch('/api/getSuggestionList')
            .then(res => res.json())
            .then((data) => {
                if (data == null) {
                    setError("데이터가 없습니다.");
                } else if (Array.isArray(data)) {
                    setExams(data);
                } else {
                    setError("예상한 형식의 데이터가 아닙니다.");
                }
                setLoading(false);  // 데이터 로딩 완료
            })
            .catch((err) => {
                console.error("API 호출 오류:", err);
                setError("데이터를 불러오는 데 실패했습니다.");
                setLoading(false);
            },[]);
    });

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
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
  };

    return (
        <>
            <h1>건의사항</h1>
            <div>
                <Link to='/suggest'>건의하기</Link>
            </div>
            <ul>
                {exams.map((exam, index) => (
                    <li key={index}>
                        <div>순서 : {exam.id}</div>
                        <div>작성자 : {exam.user_id}</div> {/* exam 객체에 user_id가 있어야 합니다 */}
                        <div>제목 : {exam.title}</div>
                        <div>작성일: {formatDate(exam.feedback_date)}</div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Suggestion;
