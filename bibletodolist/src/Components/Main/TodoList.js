import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import './TodoList.css';


const TodoList = () => {
    const location = useLocation();
    const [getTestament, setGetTestament] = useState([]);  // 구약/신약
    const [getList, setGetList] = useState([]);            // 성경 리스트
    const [getChapter, setGetChapter] = useState([]);      // 챕터 리스트
    const [num1, setNum1] = useState(null);  // 첫 번째 클릭된 값
    const [num2, setNum2] = useState(null);  // 두 번째 클릭된 값
    const [selectedRange, setSelectedRange] = useState([]);  // 선택된 범위
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [isButtonsVisible, setIsButtonsVisible] = useState(false); // 버튼이 보일지 여부
    const [clickCount, setClickCount] = useState(0);  // 클릭 횟수 추적
    const [modal1IsOpen, setModal1IsOpen] = useState(false); // 모달1 상태
    const [modal2IsOpen, setModal2IsOpen] = useState(false); // 모달2 상태
    const [list, setList] = useState(null);
    const [todos, setTodos] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    // 구약/신약 선택
    const selectTestament = (e) => {
        // 범위와 챕터 초기화
        setSelectedRange([]);
        setSelectedChapter(null);
        setNum1(null);
        setNum2(null);
        setIsButtonsVisible(false);
        setClickCount(0);

        fetch('/api/getBibleTestament', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ testament: e.target.textContent })
        })
            .then(response => response.json())
            .then(data => {
                setGetList(data);
                setGetChapter([]);  // 이전 챕터 리스트 초기화
            });
    };

    // 리스트 선택
    const selectList = (e) => {
        fetch('/api/getChapter', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ list: e.target.textContent })
        })
            .then(response => response.json())
            .then(data => {
                setGetChapter(data);
                setGetList([]);  // 이전 리스트 초기화
                setIsButtonsVisible(true); // 버튼 보이게 하기
                setClickCount(0);  // 클릭 횟수 초기화
                setList(e.target.textContent);
            });
    };

    const selectChapter = (chapter) => {
        const chapterNum = parseInt(chapter);  // 선택된 챕터 번호를 숫자로 변환

        if (clickCount === 0) {
            // 첫 번째 클릭, num2 설정 (1부터 num2까지 범위)
            setNum1(chapterNum);
            setNum2(chapter);
            const range = Array.from({ length: 1 }, () => 1);
            setSelectedRange(range);
            setClickCount(1);  // 첫 번째 클릭 후 clickCount 1로 설정
        } else if (clickCount === 1) {
            // 두 번째 클릭
            if (chapterNum < num1) {
                setNum1(chapterNum);
                setNum2(num1);
            }
            else if (chapterNum === num2) {
                setNum1(chapterNum);
                setNum2(chapterNum);
            } else {
                setNum2(chapterNum);
            }

            setClickCount(2);  // 두 번째 클릭 후 clickCount 2로 설정
        } else if (clickCount === 2) {
            // 세 번째 클릭, num1 변경 (1부터 새로운 num1까지 범위)
            setNum1(chapterNum);
            setNum2(chapterNum);  // 새로운 num2 설정
            const range = Array.from({ length: chapterNum }, (_, index) => index + 1);
            setSelectedRange(range);
            setClickCount(1);  // 세 번째 클릭 후 clickCount 1로 초기화
        }

        setSelectedChapter(chapter); // 선택된 챕터 업데이트
    };

    // 상태 변경 후 동작을 처리하는 useEffect
    useEffect(() => {
        fetch('/api/getTodo')
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setTodos(data);
            })

        // 상태 업데이트 후 num1과 num2의 값을 확인하고 원하는 작업을 실행
        if (clickCount === 1 || clickCount === 2) {
            const range = Array.from({ length: Math.abs(num2 - num1) + 1 }, (_, index) => num1 + index);
            setSelectedRange(range);
        }
    }, [num1, num2, clickCount]);  // num1, num2가 변경될 때마다 실행

    // 모달 닫기
    const closeModal = () => {
        setModal1IsOpen(false);
        setModal2IsOpen(false);
        setNum1(null);
        setNum2(null);
        setSelectedRange([]);
        setSelectedChapter(null);
        setIsButtonsVisible(false);
        setClickCount(0);  // 클릭 횟수 초기화
        setGetTestament([]);
        setGetList([]);
        setGetChapter([]);
    };

    // 모달 열기
    const openModal1 = () => {
        setModal1IsOpen(true);
    };

    const save = () => {
        console.log(list + num1 + num2)
        fetch('/api/saveTodo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                title: `${list}${num1}:${num2}`,
                list: list,
                firstChapter: num1,
                lastChapter: num2,
                user_id: sessionStorage.getItem("user_id")
            })
        }
        )
        setModal1IsOpen(false);
        setNum1(null);
        setNum2(null);
        setSelectedRange([]);
        setSelectedChapter(null);
        setIsButtonsVisible(false);
        setClickCount(0);  // 클릭 횟수 초기화
        setGetTestament([]);
        setGetList([]);
        setGetChapter([]);
    };


    // 모달 열기
    const openModal2 = (id) => {
        setModal2IsOpen(true);
        setSelectedId(id);
    };

    const setStatus = (status) => {
        fetch('/api/updateStatus', {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                id: selectedId,
                status: status
            })
        })
        setModal2IsOpen(false);
        window.location.reload();
    }
    
    return (
        <>
            <h1>To do list</h1>
            <button onClick={openModal1}>할 일 추가</button>
            <div className="toDoFrame">
                <div className="toDoChildFrame">
                    <p>성경 읽기 목표</p>
                    <ul>
                        {todos.filter(todo => todo.status === 'wait' && todo.user_id === sessionStorage.getItem("user_id")).map((todo, index) => (
                            <button onClick={() => openModal2(todo.id)}><li key={index}>{todo.title}</li></button>
                        ))}
                    </ul>
                </div>
                <div className="toDoChildFrame">
                    <p>진행중</p>
                    <ul>
                        {todos.filter(todo => todo.status === 'doing' && todo.user_id === sessionStorage.getItem("user_id")).map((todo, index) => (
                            <button onClick={() => openModal2(todo.id)}><li key={index}>{todo.title}</li></button>
                        ))}
                    </ul>
                </div>
                <div className="toDoChildFrame">
                    <p>완료</p>
                    <ul>
                        {todos.filter(todo => todo.status === 'done' && todo.user_id === sessionStorage.getItem("user_id")).map((todo, index) => (
                            <button onClick={() => openModal2(todo.id)}><li key={index}>{todo.title}</li></button>
                        ))}
                    </ul>
                </div>
            </div>

            <Modal isOpen={modal1IsOpen} onRequestClose={closeModal}> 
                <button onClick={closeModal}>닫기</button>

                <div className="ulFrame">
                    <ul>
                        <button onClick={selectTestament}><li className="Testamentlist">구약</li></button>
                        <button onClick={selectTestament}><li className="Testamentlist">신약</li></button>
                    </ul>
                    <ul>
                        {getList.map((list, index) => (
                            <button onClick={selectList} key={index}>
                                <li className="Listlist">
                                    {list}
                                </li>
                            </button>
                        ))}
                    </ul>

                    <ul>
                        {getChapter.map((chapter, index) => (
                            <button
                                className={`chapterButton ${selectedRange.includes(parseInt(chapter)) ? 'selectedRange' : ''}`}
                                onClick={() => selectChapter(chapter)}
                                key={index}
                            >
                                <li className="Chapterlist">
                                    {chapter}
                                </li>
                            </button>
                        ))}

                        {isButtonsVisible && (
                            <div className="buttonsContainer">
                                <button onClick={() => { setSelectedRange([]); setNum1(null); setNum2(null); setClickCount(0) }} className="resetButton">초기화</button>
                                <button onClick={save} className="applyButton">추가하기</button>
                                선택한 성경 목차: {list}
                                <div className="numberButtons">
                                    {/* 첫 번째 버튼 */}
                                    <button className="numberButton">{num1}</button><span className="numberSpan">장에서</span>
                                    {/* 두 번째 버튼 */}
                                    <button className="numberButton">{num2}</button><span className="numberSpan">장까지</span>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </Modal>

            <Modal isOpen={modal2IsOpen} onRequestClose={closeModal}>
                <button onClick={closeModal}>닫기</button>

                <br />
                <button onClick={() => setStatus('wait')}>대기</button>
                <button onClick={() => setStatus('doing')}>진행중</button>
                <button onClick={() => setStatus('done')}>완료</button>
            </Modal>

        </>
    );
};

export default TodoList;
