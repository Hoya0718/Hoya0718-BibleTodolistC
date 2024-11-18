import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Main5 = () => {
  const location = useLocation();
  
  const { list, chapter, verse } = location.state || {};
  const [currentChapter, setCurrentChapter] = useState(chapter); // ChooseTestament에서 받은 장을 초기값으로 사용
  const [contents, setContents] = useState([]);

  const jsonData = {
    list, // list: list
    chapter: currentChapter, // chapter: currentChapter
    verse // verse: verse
  };

  useEffect(() => {
    // currentChapter가 변경될 때마다 API 호출
    console.log("받은 장:", currentChapter);
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
        setContents(data);
      })
      .catch(error => console.error("Error fetching data:", error)); // 에러 처리
  }, [currentChapter]);  // currentChapter가 변경될 때마다 API 호출

  // 이전 장
  const prevChapter = () => {
    const prev = parseInt(currentChapter.replace('장', ''), 10) - 1; // "장"을 제거하고 숫자 계산
    setCurrentChapter(prev + "장");  // 숫자 계산 후 다시 "장"을 붙여서 상태 업데이트
  };

  // 다음 장
  const nextChapter = () => {
    const prev = parseInt(currentChapter.replace('장', ''), 10) + 1; // "장"을 제거하고 숫자 계산
    setCurrentChapter(prev + "장");  // 숫자 계산 후 다시 "장"을 붙여서 상태 업데이트
  };

  return (
    <div>
      <ul>
        {contents.map((content, index) => (
          <li key={index}>{content.verse}: {content.content}</li>
        ))}
      </ul>
      <button onClick={prevChapter}>이전 장</button> | 
      <button onClick={nextChapter}>다음 장</button>
    </div>
  );
};

export default Main5;
