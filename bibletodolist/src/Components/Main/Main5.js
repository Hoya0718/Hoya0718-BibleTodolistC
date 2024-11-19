import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Main5 = () => {
  const location = useLocation();
  const { list, chapter, verse } = location.state || {};

  const [maxChapter, setMaxChapter] = useState(""); // maxChapter 초기값
  const [currentList, setCurrentList] = useState(list);
  const [currentChapter, setCurrentChapter] = useState(chapter); // 선택된 장 초기값
  const [currentVerse, setCurrentVerse] = useState(verse);
  const [contents, setContents] = useState([]);

  const jsonList = {
    list: currentList
  };

  const jsonData = {
    list: currentList,
    chapter: currentChapter,
    verse: currentVerse
  };

  // API 호출로 성경 내용 가져오기
  useEffect(() => {
    fetch('/api/getSelectedContent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => response.json())
      .then(data => {
        const lastItem = data[data.length - 1];
        setMaxChapter(lastItem.maxChapter); // 최대 장 설정
        setContents(data);
      })
      .catch(error => console.error("Error fetching data:", error)); // 에러 처리
  }, [currentChapter]);  // currentChapter가 변경될 때마다 호출

  // 장/편 구분 함수
  const getChapterLabel = (book, chapter) => {
    if (book === "시편") {
      return chapter.replace('장', '편');
    }
    return chapter; // 기본적으로 "장"을 그대로 사용
  };

  // 이전 장 이동
  const prevChapter = () => {
    const chapterNum = parseInt(currentChapter.replace('장', '').replace('편', ''), 10);

    if (chapterNum > 1) {
      console.log("이전 장으로 이동 되었습니다.");
      const prev = chapterNum - 1;
      setCurrentChapter(getChapterLabel(currentList, prev + "장")); // "편" 또는 "장" 처리
      setCurrentVerse("1절");
    } else {
      if (currentList === "창세기" && currentChapter === '1장') {
        window.alert("처음입니데이");
      }
      console.log("이전 목차를 호출해 주세요.");
      fetch('/api/prevList', {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(jsonList)
      })
        .then(res => res.json())
        .then(data => {
          setCurrentList(data.list);
          setCurrentChapter(getChapterLabel(data.list, data.maxChapter)); // "편" 또는 "장" 처리
          setCurrentVerse("1절");
        })
        .catch(error => console.error("Error fetching previous list:", error));
    }
  };

  // 다음 장 이동
  const nextChapter = () => {
    if (!maxChapter) {
      console.log("최대 장을 가져오지 못했습니다.");
      return;
    }

    const currentChapterNum = parseInt(currentChapter.replace('장', '').replace('편', ''), 10);
    const maxChapterNum = parseInt(maxChapter.replace('장', '').replace('편', ''), 10);

    if (maxChapterNum > currentChapterNum) {
      console.log("다음 장으로 이동 되었습니다.");
      const nextChapterNum = currentChapterNum + 1;
      setCurrentChapter(getChapterLabel(currentList, nextChapterNum + "장")); // "편" 또는 "장" 처리
      setCurrentVerse("1절");
    } else {
      if (currentList === "요한계시록" && currentChapter === '22장') {
        window.alert("끝입니데이");
      } else {
        console.log("다음 목차를 호출해 주세요.");
        fetch('/api/nextList', {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(jsonList)
        })
          .then(res => res.json())
          .then(data => {
            setCurrentList(data.list);
            setCurrentChapter(getChapterLabel(data.list, "1장")); // "편" 또는 "장" 처리
            setCurrentVerse("1절");
          })
          .catch(error => console.error("Error fetching next list:", error));
      }
    }
  };

  return (
    <div>
      <ul>
        {contents.slice(0, -1).map((content, index) => (
          <li key={index}>{content.verse}: {content.content}</li>
        ))}
      </ul>
      <button onClick={prevChapter}>이전 장</button> |
      <button onClick={nextChapter}>다음 장</button>
    </div>
  );
};

export default Main5;