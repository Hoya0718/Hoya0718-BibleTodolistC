import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import './ChooseTestament.css'
const ChooseTestament = () => {

  const location = useLocation();
  const [lists, setLists] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [lastList, setLastList] = useState("");
  // state 값이 없을 경우 기본값 설정
  const getProp = location.state?.prop || "기본값";

  const jsonTestament = { testament: getProp } // String형인 getProp을 Json형식으로

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
  
  const getChapter = (e) => {
    const jsonChapter = {list : e.target.textContent};
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

    const getVerse = (e) => {
      const jsonVerse = { 
        chapter : e.target.textContent,
        list : lastList
    }
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

return (
  <div>
    <h1>전달 받은 데이터: {getProp}</h1>
    <div className="frame">
      <div>
        <ul>
          {lists.map((list, index) => (
            <li key={index}><button onClick={getChapter}>{list}</button></li>
          ))}
        </ul>
      </div>
      <div>
          <ul>
            {chapters.map((chapter, index) => (
              <li key={index}><button onClick={getVerse}>{chapter}</button></li>
            ))}
          </ul>
      </div>
      <div>
          <ul>
            {verses.map((verse, index) => (
              <li key={index}><button>{verse}</button></li>
            ))}
          </ul>
      </div>
    </div>
  </div>
);
};

export default ChooseTestament;
