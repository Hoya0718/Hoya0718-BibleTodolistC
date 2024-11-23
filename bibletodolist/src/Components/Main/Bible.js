import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import './Bible.css'
const Main5 = () => {

  const location = useLocation();
  const { list, chapter, verse } = location.state || {};

  const [maxChapter, setMaxChapter] = useState(); // maxChapter 초기값
  const [currentList, setCurrentList] = useState(list);
  const [currentChapter, setCurrentChapter] = useState(chapter); // 선택된 장 초기값
  const [currentVerse, setCurrentVerse] = useState(verse);
  //const [contents, setContents] = useState([]);
  const [getComment, setGetComment] = useState([]); //
  const [comment, setComment] = useState([]); // 댓글
  const [maxVerse, setMaxVerse] = useState();
  const [content, setContent] = useState("");
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
    chapter: currentChapter,
    verse: currentVerse
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

    //선택한 성경 구절을 가져온다.
    fetch('/api/getSelectedContent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMaxVerse(data.maxVerse);
        setMaxChapter(data.maxChapter); // 최대 장 설정
        setCurrentVerse(data.verse); // 기본값 제공
        setContent(data.content); // 성경 내용 설정 
      })
      .catch(error => console.error("Error fetching content:", error));
  }, [currentVerse]);  // currentVerse가 변경될 때마다 호출됩니다.
  // 성경 봤는지 안 봤는지
  // fetch('/api/checkVerse', {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json; charset=utf-8",
  //   },
  //   body: JSON.stringify(jsonCheckVerse)
  // })
  //   .then(data => {
  //     console.log("체크 한 성경 구절 " + data);
  //   })

  // 댓글 목록을 가져오는 API 호출

  {/*fetch('/api/getComment')
      .then((res) => res.json())
      .then(data => {
        setGetComment(data); // 댓글 목록을 상태에 업데이트
      })
      .catch(error => console.error("Error fetching comments:", error));*/}

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
          <h1><br /><br /><button onClick={prevVerse} >이전 절</button> <button onClick={nextVerse}>다음 절</button></h1>
        </div>

        <button onClick={writeCommentButton}>은혜 나누기</button>
        <br /><br />
      
        <ul className="exam">

        </ul>
      </div>
    </div>
  );
};

export default Main5;
