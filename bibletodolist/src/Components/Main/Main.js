import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import alarm from '../../img/alarm.png'
import biblebook from '../../img/biblebook.png'
import bookmark from '../../img/bookmark.png'
import glasses from '../../img/glasses.png'

import './Main.css'

const Main = () => {

    const userId = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem('user_role');
    const [bible, setBible] = useState({});

    useEffect(() => {
        fetch("/api/todayBible")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBible(data);
            })
            .catch(error => console.error('Error fetching Bible data:', error));
    }, []);  // empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="fullFrame">
            <div className="headerFrame">
                <p className="helloUserText">{userId}님 환영합니다</p>
                <img className="alarmImg" src={alarm} alt="Alarm Icon" />
            </div>

            <div className="bodyFrame">
                <div className="mainFrame">
                    <Link className="mainLink" to="/basic/chooseTestament" state={{ prop: "구약" }}>
                        <div className="main">
                            <div className="mainChild">
                                <img className="mainImg" src={biblebook} alt="Bible Book" />
                            </div>
                            <div className="mainChild">
                                <div>
                                    <p className="mainText">구약 성경</p>
                                </div>
                                <div>
                                    <p className="subText">바로가기</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className="mainLink" to="/basic/chooseTestament" state={{ prop: "신약" }}>
                        <div className="main">
                            <div className="mainChild">
                                <img className="mainImg" src={biblebook} alt="Bible Book" />
                            </div>
                            <div className="mainChild">
                                <div>
                                    <p className="mainText">신약 성경</p>
                                </div>
                                <div>
                                    <p className="subText">바로가기</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className="mainLink" to="/basic/SearchWord">
                        <div className="main">
                            <div className="mainChild">
                                <img className="mainImg" src={glasses} alt="Search Glasses" />
                            </div>
                            <div className="mainChild">
                                <div>
                                    <p className="mainText">검색</p>
                                </div>
                                <div>
                                    <p className="subText">바로가기</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className="mainLink" to="/basic/suggestion">
                        <div className="main">
                            <div className="mainChild">
                                <img className="mainImg" src={bookmark} alt="Bookmark" />
                            </div>
                            <div className="mainChild">
                                <div>
                                    <p className="mainText">피드백</p>
                                </div>
                                <div>
                                    <p className="subText">바로가기</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="dailyBibleFrame">
                    {/* Check if bible data is loaded before rendering */}
                    {bible.list && bible.chapter && bible.verse && bible.content ? (
                        <div>
                            <span>오늘의 말씀: {bible.list} 장: {bible.chapter} 절: {bible.verse}</span>
                            <div>{bible.content}</div>
                        </div>
                    ) : (
                        <div>오늘의 말씀을 불러오는 중...</div>
                    )}
                </div>

                <div className="dailyProverbsFrame">
                    <Link to="TodoList">
                        <div>
                            <span>To do list 바로가기</span>
                        </div>
                    </Link>
                </div>

                <div>성경 진행률</div>
            </div>
        </div>
    );
};

export default Main;
