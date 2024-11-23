import React, { useState } from 'react'

const SearchWord = () => {
    const [word, setWord] = useState('');
    const [getlists, setGetList] = useState([]);

    const handleChange = (e) => {
        setWord(e.target.value);
    }

    const search = () => {
        fetch('/api/SearchWord', {
            method: "POST",
            headers: {  // header -> headers로 수정
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ "content": word })
        })
            .then(res => res.json())
            .then(data => {
                console.log("받은 데이터:", data);
                setGetList(data);
                setWord('');
            })
            .catch(error => {
                console.error("에러 발생:", error);
            });
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    value={word}
                    onChange={handleChange}
                    placeholder="검색어를 입력하세요"
                />
                <button onClick={search}>검색</button>
            </div>
            <div>성경</div>
            <ul>

                {getlists && getlists.map((list, index) => (
                    <li key={index}>
                        {/* Map 객체의 각 필드를 표시 */}
                        {list.list} {list.chapter}장 {list.verse}절: {list.content}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default SearchWord;