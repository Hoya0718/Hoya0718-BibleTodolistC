import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './ChooseTestament.css'
const ChooseTestament = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [lists, setLists] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);

  // 마지막으로 선택된 목차, 장, 절을 가져와 해당되는 구문 출력하기 위해 사용
  const [lastList, setLastList] = useState("");
  const [lastChapter, setLastChapters] = useState("");

  // state 값이 없을 경우 기본값 설정
  const getProp = location.state?.prop || "기본값";

  const jsonTestament = { testament: getProp } // String형인 getProp을 Json형식으로

  //선택한 성경(구약, 신약)의 목차를 호출하는 메서드
  useEffect(() => { 
    fetch('/api/getBibleTestament', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonTestament) //json형식인 jsonObject를 서버로 
    })
      .then(response => response.json())
      .then(data => {
        setLists(data);
      })
  }, []);

  //선택한 목차(ex. 창세기, 출애굽기)의 장을 호출하는 메서드
  const getChapter = (e) => {
    const jsonChapter = { list: e.target.textContent };
    setLastList(e.target.textContent);
    setVerses([]); //절 초기화

    fetch('/api/getChapter', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonChapter)
    })
      .then(response => response.json())
      .then(data => {
        setChapters(data);
      })
  };

  //선택한 장(ex. 창세기 1장)의 절을 호출하는 메서드
  const getVerse = (e) => {
    const jsonVerse = {
      chapter: e.target.textContent,
      list: lastList
    }
    setLastChapters(e.target.textContent);
    fetch('/api/getVerse', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonVerse)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setVerses(data);
      })
  };

  //선택한 절(ex. 창세기 1장 1절)의 내용을 호출해 main5컴포넌트에게 전송 및 이동
  const getContent = (e) => {
    console.log(lastList);
    console.log(lastChapter);
    console.log(e.target.textContent);
    navigate('/basic/main5', { state: { list: lastList, chapter: lastChapter, verse: e.target.textContent } });
  }


  return (
    <div>
      <h1>전달 받은 데이터: {getProp}</h1>
      <div className="frame">
        <div>
          <ul>
            {lists.map((list, index) => (
              <li key={index}><button onClick={getChapter}>{list}</button></li> //목차 선택
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {chapters.map((chapter, index) => (
              <li key={index}><button onClick={getVerse}>{chapter}</button></li> //장 선택
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {verses.map((verse, index) => (
              <li key={index}><button onClick={getContent}>{verse}</button></li> //절 선택
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChooseTestament;
