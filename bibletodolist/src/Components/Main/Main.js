import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import alarm from '../../img/alarm.png';
import biblebook from '../../img/biblebook.png';
import bookmark from '../../img/bookmark.png';
import glasses from '../../img/glasses.png';
import ProgressBar from './ProgressBar';

import './Main.css';

const Main = () => {
    const userId = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem('user_role');
    const [bible, setBible] = useState({});
    const [totalReading, setTotalReading] = useState("");
    const [totalProgress, setTotalProgress] = useState({});

    // 오늘의 성경 데이터를 가져오는 useEffect
    useEffect(() => {
        fetch("/api/todayBible")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBible(data);
            })
            .catch(error => console.error('Error fetching Bible data:', error));
    }, []); // 빈 배열을 넣어서 컴포넌트가 마운트될 때 한 번만 호출

    // 전체 진행률 데이터를 가져오는 useEffect
    useEffect(() => {
        if (userId) { // userId가 존재하는 경우에만 호출
            fetch("/api/totalReading", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({ user_id: userId })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setTotalReading(data);
                })
                .catch(error => console.error('Error fetching total reading data:', error));
        }
    }, []);

    // 진행률 데이터 가져오는 useEffect
    useEffect(() => {
        if (userId) { // userId가 존재하는 경우에만 호출
            fetch("/api/totalProgress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({ user_id: userId })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setTotalProgress(data); // 전체 진행률 상태 업데이트
                })
                .catch(error => console.error('Error fetching total progress data:', error));
        }
    }, [userId]);

    // '0.33'과 같은 문자열을 숫자로 변환하고 소수점 2자리로 포맷
    const formattedProgress = totalProgress.progress_bar 
      ? parseFloat(totalProgress.progress_bar).toFixed(2)
      : "0.00";

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
                <div>전체 진행률</div>
                <div>{formattedProgress}%</div>
                <ProgressBar progress={formattedProgress} />
                <div>({totalReading.count} / 31089)</div>
            </div>
        </div>
    );
};

export default Main;
