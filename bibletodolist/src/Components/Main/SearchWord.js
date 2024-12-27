import React, { useState } from 'react';

const SearchWord = () => {
    const [word, setWord] = useState('');
    const [searchedWord, setSearchedWord] = useState(''); // 검색된 단어를 저장하는 상태 추가
    const [getlists, setGetList] = useState([]);

    const handleChange = (e) => {
        setWord(e.target.value);
    };

    const search = () => {
        setSearchedWord(word); // 검색 시 검색어 저장
        fetch('/api/SearchWord', {
            method: "POST",
            headers: {
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
    };

    // 검색어를 하이라이트하는 함수
    const highlightText = (text, searchWord) => {
        if (!searchWord || !text) return text;
        
        try {
            const regex = new RegExp(`(${searchWord})`, 'gi');
            const parts = text.split(regex);
            return parts.map((part, index) => 
                part.toLowerCase() === searchWord.toLowerCase() ? 
                    <span key={index} style={{backgroundColor: '#90CDF4'}}>{part}</span> : part
            );
        } catch (error) {
            return text;
        }
    };
    
    return (
        <>
            <div>
                <h2>성경 내용을 검색하세요</h2>
                <br/>
            </div>
            <div>
                <input
                    type="text"
                    value={word}
                    onChange={handleChange}
                    placeholder="검색어를 입력하세요"
                />
                <button onClick={search}>검색</button>
            </div>
            <br/>
            <ul>
                {getlists && getlists.map((list, index) => (
                    <li key={index}> 
                        {list.list} {list.chapter}장 {list.verse}절: {' '}
                        {highlightText(list.content, searchedWord)} {/* searchedWord 사용 */}
                        <br/>
                        <br/>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default SearchWord;