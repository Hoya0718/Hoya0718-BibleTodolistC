import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const ChooseTestament = () => {

  const getChapter = () => {
    
  }
  const location = useLocation();
  const [lists, setLists] = useState([]);
  // state 값이 없을 경우 기본값 설정
  const getProp = location.state?.prop || "기본값";

  const jsonObject = { testament: getProp } // String형인 getProp을 Json형식으로

  useEffect(() => {
    fetch('/api/getBibleTestament', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonObject) //json형식인 jsonObject를 서버로 
    })
      .then(response => response.json())
      .then(data => {
        setLists(data);
      })
  }, []);
  return (
    <div>
      <h1>전달 받은 데이터: {getProp}</h1>
      <ul>
        {lists.map((list, index) => (
          <li key={index}><button onClick={getChapter}>{list}</button></li>
        ))}
      </ul>
    </div>
  );
};

export default ChooseTestament;
