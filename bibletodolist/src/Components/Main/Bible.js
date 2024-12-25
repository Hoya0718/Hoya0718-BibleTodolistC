import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";

import './Bible.css'
const Main5 = () => {

  const location = useLocation();
  const { list, chapter, verse } = location.state || {};

  const [GraceIsOpen, setGraceIsOpen] = useState(false); // 모달 상태
  const [inputValue, setInputValue] = useState('');
  const [maxChapter, setMaxChapter] = useState(); // maxChapter 초기값
  const [currentList, setCurrentList] = useState(list);
  const [currentChapter, setCurrentChapter] = useState(chapter); // 선택된 장 초기값
  const [currentVerse, setCurrentVerse] = useState(verse);
  const [bibleId, setBibleId] = useState();
  const [maxVerse, setMaxVerse] = useState();
  const [content, setContent] = useState("");
  const [likecount, setLikeCount] = useState();
  const [refresh, setRefresh] = useState(false);  // 상태를 추가하여 좋아요 클릭 시 리렌더링 유도

  const user_id = sessionStorage.getItem("user_id");

  const jsonList = {
    list: currentList
  };

  const jsonData = {
    list: currentList,
    chapter: currentChapter,
    verse: currentVerse,
    user_id: user_id
  };


  const [checkedItems, setCheckedItems] = useState({}); // 각 항목의 체크 상태를 관리
  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],  // 체크 상태를 반전
    }));
  };

  const jsonCheckVerse = {
    user_id: sessionStorage.getItem("user_id"),
    list: currentList,
    chapter: currentChapter,
    verse: currentVerse
  };

  useEffect(() => {
    // API 요청을 위한 공통 설정
    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    };

    const fetchData = async () => {
        try {
            // 병렬로 두 요청을 동시에 실행
            const [contentResponse, _] = await Promise.all([
                fetch('/api/getSelectedContent', {
                    ...fetchConfig,
                    body: JSON.stringify(jsonData)
                }),
                fetch('/api/checkVerse', {
                    ...fetchConfig,
                    body: JSON.stringify(jsonCheckVerse)
                })
            ]);

            // 성경 내용 데이터 처리
            const { 
                like_count,
                bible_id,
                maxVerse,
                maxChapter,
                content 
            } = await contentResponse.json();

            // 상태 일괄 업데이트
            setLikeCount(like_count);
            setBibleId(bible_id);
            setMaxVerse(maxVerse);
            setMaxChapter(maxChapter);
            setContent(content);

        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        }
    };

    fetchData();
}, [currentVerse, refresh, jsonData, jsonCheckVerse]);



  // 댓글 목록을 가져오는 API 호출

  {/*fetch('/api/getComment')
      .then((res) => res.json())
      .then(data => {
        setGetComment(data); // 댓글 목록을 상태에 업데이트
      })
      .catch(error => console.error("Error fetching comments:", error));*/}

  const prevVerse = () => {
    let updatedVerse = currentVerse;
    let updatedChapter = currentChapter;
    let updatedList = currentList;
    if (1 < currentVerse) {
      console.log("절 다운그레이드")
      updatedVerse = currentVerse - 1;
      setCurrentVerse(updatedVerse);
    }
    else {
      if (currentList === "창세기" && currentChapter === '1' && currentVerse === 1) {
        window.alert("처음입니데이");
      }
      //현재 장이 1장보다 크면 현재 장 -1 빼기
      else if (1 < currentChapter) {
        updatedChapter = currentChapter - 1;

        fetch('/api/getMaxVerse', {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            list: currentList,
            chapter: updatedChapter
          })
        })
          .then(res => res.json())
          .then(data => {
            updatedVerse = data.maxVerse;  // 이전 장의 최대 절 번호로 설정
            setCurrentChapter(updatedChapter);  // 장 업데이트
            setCurrentVerse(updatedVerse);     // 절 업데이트
          })
      }
      else {
        // fetch 요청을 바로 실행
        fetch('/api/prevList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(jsonList)
        })
          .then(res => res.json())
          .then(data => {
            updatedList = data.list
            setCurrentList(updatedList)
            updatedChapter = data.maxChapter
            setCurrentChapter(updatedChapter)

            fetch('/api/getMaxVerse', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: JSON.stringify({
                list: updatedList,  // 이전 목록
                chapter: updatedChapter,  // 이전 목록의 마지막 장
              }),
            })
              .then(res => res.json())
              .then(data => {
                updatedVerse = data.maxVerse;
                setCurrentVerse(updatedVerse);
              })
          })
      }
    }

    console.log("현재 절", currentVerse); // 업데이트된 currentVerse는 아직 바로 반영되지 않음
    console.log("변경 후 절", updatedVerse); // 증가된 verse 값
  };

  const nextVerse = () => {
    let updatedVerse = currentVerse;
    let updatedChapter = currentChapter;
    let updatedList = currentList;

    // 현재 절이 마지막 절이 아닐 경우
    if (currentVerse < maxVerse) {
      console.log("절 업그레이드")
      updatedVerse = currentVerse + 1;
      setCurrentVerse(updatedVerse);
    }
    else {
      // 마지막 절일 경우, 다음 장으로 넘어간다.
      //해당 현재장이 요한계시록 22장 21절일 경우 '끝입니다' 메세지 출력
      if (currentList === "요한계시록" && currentChapter === '22' && currentVerse === 21) {
        window.alert("끝입니다");
      }
      //현재 장이 다음 장보다 작으면 다음 장으로
      else if (currentChapter < maxChapter) {
        updatedChapter = parseInt(currentChapter) + 1;
        updatedVerse = 1; // 다음 장의 첫 절로 설정
        setCurrentChapter(updatedChapter);
        setCurrentVerse(updatedVerse);
      }
      else {
        // 마지막 장일 때는 목차로 넘어가기
        fetch('/api/nextList', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(jsonList)
        })
          .then(res => res.json())
          .then(data => {
            setCurrentList(data.list);
            setCurrentChapter(1); // 첫 장으로 설정
            setCurrentVerse(1); // 첫 절로 설정
          })
          .catch(error => console.error("Error fetching next list:", error));
      }
    }
  }

  // 모달 닫기
  const closeModal = () => {
    setInputValue('');
    setGraceIsOpen(false);
  };

  // 모달 열기
  const openGrace = () => {
    setGraceIsOpen(true);
  };

  const jsonComment = {
    user_id: sessionStorage.getItem("user_id"),
    comment: inputValue,
    list: currentList,
    chapter: currentChapter,
    verse: currentVerse
  };

  const writeComment = () => {
    fetch('/api/writeComment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonComment)
    })
    window.alert("은혜 나눔에 감사합니다.");
    setInputValue('');
    setGraceIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const likeBible = (bible_id) => {

    let user_id = sessionStorage.getItem("user_id");
    console.log(bible_id + " " + user_id)

    fetch('/api/likeBible', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        bible_id: bible_id,
        user_id: user_id
      })
    })
      .then(() => {
        console.log("재실행");
        setRefresh(prev => !prev);  // 상태를 토글하여 useEffect가 다시 실행되게 만듬}
      });
  }
  return (
    <div>
      <div>
        <div>
          {currentList} : {currentChapter}<br />
          ({currentVerse}: {maxVerse}) <br />
        </div>
        <br />
        <div>{content}</div>
        <div>
          <div>[{likecount}]<button onClick={() => likeBible(bibleId)}>좋아요</button></div>
          <h1><br /><br /><button onClick={prevVerse} >이전 절</button> <button onClick={nextVerse}>다음 절</button></h1>
        </div>

        <button onClick={() => { openGrace() }}>은혜 나누기</button>
        <br /><br />

        <Modal isOpen={GraceIsOpen} onRequestClose={closeModal}>
          <button onClick={closeModal}>닫기</button>
          <div>
            {currentList} {currentChapter}장 {currentVerse}절
            <br />
            {content}
          </div>
          <div>
            <input
              type="text"
              value={inputValue} // input의 value는 상태값으로 설정
              onChange={handleInputChange} // input 값이 변경되면 상태 업데이트
            />
            <button onClick={writeComment}>댓글 작성</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Main5;
