import React from "react";
import { Link } from "react-router-dom";

import alarm from '../../img/alarm.png'
import biblebook from '../../img/biblebook.png'
import bookmark from '../../img/bookmark.png'
import glasses from '../../img/glasses.png'

import './Main.css'

const Main = () => {

    const userId = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem('user_role');

    return (
        <div className="fullFrame">

            <div className="headerFrame">
                <p className="helloUserText">{userId}님 환영합니다</p>
                <img className="alarmImg" src={alarm} />
            </div>

            <div className="bodyFrame">
                <div className="mainFrame">
                    <Link className="mainLink" to="/basic/chooseTestament" state={{ prop: "구약" }}>
                        <div className="main">
                            <div className="mainChild">
                                <img className="mainImg" src={biblebook} />
                            </div>
                            <div className="mainChild">
                                <div>
                                    <p className="mainText"> 구약 성경 </p>
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
                                <img className="mainImg" src={biblebook} />
                            </div>
                            <div className="mainChild">
                                <div>
                                    <p className="mainText"> 신약 성경 </p>
                                </div>
                                <div>
                                    <p className="subText">바로가기</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className="mainLink" to="/basic/">
                        <div className="main">
                            <div className="mainChild">
                                <img className="mainImg" src={glasses} />
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
                    <Link className="mainLink" to="/basic/">
                        <div className="main">
                            <div className="mainChild">
                                <img className="mainImg" src={bookmark} />
                            </div>
                            <div className="mainChild">
                                <div>
                                    <p className="mainText">피드백 </p>
                                </div>
                                <div>
                                    <p className="subText">바로가기</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div >

                <div className="dailyBibleFrame">
                    <div><span>오늘의 말씀 "여기에 DB 리스트장:절"</span></div>
                    <div>
                        여기에 해당되는 성경 구절
                    </div>
                </div>
                <div className="dailyProverbsFrame">
                    <Link to="TodoList">
                    <div>
                        <span>To do list 바로가기</span>
                    </div>
                    
                    </Link>
                </div>
                <div>
                    성경 진행률
                </div>
            </div >
        </div >
    )
}

export default Main;