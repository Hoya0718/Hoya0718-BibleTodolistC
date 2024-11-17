import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Main5 = () => {

    const location = useLocation();

    const { list, chapter, verse } = location.state || {};

    const [contents, setContents] = useState([]);

    const jsonData = {
        list,  // list: list
        chapter,  // chapter: chapter
        verse  // verse: verse
    };

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
                console.log(data);
                setContents(data);
            })
            .catch(error => console.error("Error fetching data:", error));  // 에러 처리
    }, []);  // 빈 배열을 넣으면 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <div>
            <ul>
                {contents.map((list, index) => (
                    <li key={index}>{list.verse}:{list.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Main5;
