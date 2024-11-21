import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Modal from './Modal';

import './Main5.css'
const Main5 = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const location = useLocation();
  const { list, chapter, verse } = location.state || {};

  const [maxChapter, setMaxChapter] = useState(); // maxChapter 초기값
  const [currentList, setCurrentList] = useState(list);
  const [currentChapter, setCurrentChapter] = useState(chapter); // 선택된 장 초기값
  const [currentVerse, setCurrentVerse] = useState(verse);
  const [contents, setContents] = useState([]);
  const [getComment, setGetComment] = useState([]); //
  const [comment, setComment] = useState([]); // 댓글

  const jsonComment = {
    user_id: sessionStorage.getItem("user_id"),
    comment: comment,
    list: currentList,
    chapter: currentChapter,
    verse: currentVerse
  };

  const jsonList = {
    list: currentList
  };

  const jsonData = {
    list: currentList,
    chapter: currentChapter
  };

  const [checkedItems, setCheckedItems] = useState({}); // 각 항목의 체크 상태를 관리
  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],  // 체크 상태를 반전
    }));
  };

  const jsonCheckVerse = {
    user_id : sessionStorage.getItem("user_id"),
    list : currentList,
    chapter: currentChapter,
    verse: currentVerse
  };
  
  // Fetch content and comments
  useEffect(() => {

    fetch('/api/checkVerse', {
      method : "POST",
      headers : {
        "Content-Type": "application/json; charset=utf-8",
      },
      body : JSON.stringify(jsonCheckVerse)
    })
    .then(data => {
      console.log("체크 한 성경 구절 " + data);
    })
  
    // 댓글 목록을 가져오는 API 호출
    fetch('/api/getComment')
      .then((res) => res.json())
      .then(data => {
        setGetComment(data); // 댓글 목록을 상태에 업데이트
      })
      .catch(error => console.error("Error fetching comments:", error));

    // 성경 내용을 가져오는 API 호출
    fetch('/api/getSelectedContent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const lastItem = data[data.length - 1];
          setMaxChapter(lastItem.maxChapter); // 최대 장 설정
          setCurrentVerse(data.verse || 1); // 기본값 제공
          setContents(data); // 성경 내용 설정
          console.log(data);
          
          // 안전한 로깅
          if (data[parseInt(currentVerse - 1)]) {
            console.log(data[parseInt(currentVerse - 1)].content);
          }
        }
      })
      .catch(error => console.error("Error fetching content:", error));
  }, [currentChapter, currentList]);  // currentChapter가 변경될 때마다 호출됩니다.

  const writeCommentButton = (e) => {

    e.preventDefault();  // 기본 동작 방지

    fetch('/api/writeComment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonComment)
    })

      .then(setComment(""));
    window.location.reload();
  };

  const prevChapter = () => {

    if (1 < currentChapter) {
      setCurrentChapter(parseInt(currentChapter) - 1);
      setCurrentVerse(1);
    } else {
      if (currentList === "창세기" && currentChapter === '1') {
        window.alert("처음입니데이");
      }
      else {
        fetch('/api/prevList', {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(jsonList)
        })
          .then(res => res.json())
          .then(data => {
            setCurrentList(data.list);
            setCurrentChapter(data.maxChapter);
            setCurrentVerse(1);
          })
          .catch(error => console.error("Error fetching previous list:", error));
      }
    }
  };

  const nextChapter = () => {

    if (maxChapter > currentChapter) {
      setCurrentChapter(parseInt(currentChapter) + 1);
      setCurrentVerse(1);
    }
    else {
      if (currentList === "요한계시록" && currentChapter === '22') {
        window.alert("끝입니데이");
      } else {
        fetch('/api/nextList', {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(jsonList)
        })
          .then(res => res.json())
          .then(data => {
            setCurrentList(data.list);
            setCurrentChapter(1);
            setCurrentVerse(1);
          })
          .catch(error => console.error("Error fetching next list:", error));
      }
    }
  };

  const prevVerse = () => {
    // 먼저 verse를 증가시킵니다.
    const updatedVerse = currentVerse - 1;
  
    // 상태 업데이트 후, fetch 요청을 즉시 실행
    setCurrentVerse(updatedVerse);
  
    // fetch 요청을 바로 실행
    fetch('/api/checkVerse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),  // 기존의 user_id
        list: currentList,                          // 기존의 list
        chapter: currentChapter,                    // 기존의 chapter
        verse: updatedVerse                          // 업데이트된 verse 값
      }),
    });
  
    console.log("현재 절", currentVerse); // 업데이트된 currentVerse는 아직 바로 반영되지 않음
    console.log("변경 후 절", updatedVerse); // 증가된 verse 값
  };
  
  const nextVerse = () => {
    // 먼저 verse를 증가시킵니다.
    const updatedVerse = currentVerse + 1;
  
    // 상태 업데이트 후, fetch 요청을 즉시 실행
    setCurrentVerse(updatedVerse);
  
    // fetch 요청을 바로 실행
    fetch('/api/checkVerse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),  // 기존의 user_id
        list: currentList,                          // 기존의 list
        chapter: currentChapter,                    // 기존의 chapter
        verse: updatedVerse                          // 업데이트된 verse 값
      }),
    });
  
    console.log("현재 절", currentVerse); // 업데이트된 currentVerse는 아직 바로 반영되지 않음
    console.log("변경 후 절", updatedVerse); // 증가된 verse 값
  };
  
  
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
    <div>
      <div>
      {contents.length > 0 ? contents[parseInt(currentVerse-1 || 0)].content : '로딩 중...'}
      </div>
      <div>
        <h1><br /><br /><button onClick={prevVerse} >이전 절</button> <button onClick={nextVerse}>다음 절</button></h1>
      </div>
      <ul>
        {contents.slice(0, -1).map((content, index) => (
          <li key={index}>{content.verse}: {content.content}</li>
        ))}
      </ul>

      <br />

      <button onClick={prevChapter}>이전 장</button> |
      <button onClick={openModal}> 읽기표 체크 후 다음장</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>성경 구절 CheckList</h2>
        <p>
          <ul className="checkBoxListFrame">
            {contents.slice(0, -1).map((content, index) => (
              <li key={index} className="checkBoxList">
                <input
                  type="checkbox"
                  checked={checkedItems[index] || false}  // 체크 상태 관리
                  onChange={() => handleCheckboxChange(index)}  // 체크박스 상태 변경
                />
                {content.verse}
              </li>
            ))}
            <input type="text" />-<input type="text" />
            <button>취소</button> <button>확인</button>
          </ul>
        </p>
      </Modal>


      <button onClick={nextChapter}>다음 장</button>
      <br /><br />
      <input
        type="text"
        placeholder="댓글창"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button onClick={writeCommentButton}>버튼 클릭</button>
      <br /><br />
      <ul>
        {getComment.map((comment, index) => (

          <li key={index}>
            {comment.user_id}
            {comment.comment}
            <button>{comment.like_count}</button>
            {formatDate(comment.creation_date)} {/* 날짜 출력 형식 변경 */}
          </li>

        ))}
      </ul>
      <ul className="exam">

      </ul>
    </div >
  );
};

export default Main5;
