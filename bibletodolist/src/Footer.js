import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import home from './img/home.png'
import bible from './img/bible.png'
import community from './img/community.png'
import my from './img/my.png'

const Footer = () => {
    return (
        <>
            {/*<button onClick={handleLogout}>로그아웃</button>*/}
            <div className="FooterFrame">
                <div className="footer">
                    <Link className="footerLink" to="/basic">
                        <div>
                            <img className="footerImg" src={home} />
                        </div>
                        <div>
                            홈
                        </div>
                    </Link>
                </div>
                <div className="footer">
                    <Link className="footerLink" to="/basic/continueReading">
                        <div>
                            <img className="footerImg" src={bible} />
                        </div>
                        <div>
                            이어보기 
                        </div>
                    </Link>
                </div>

                <div className="footer">
                    <Link className="footerLink" to="/basic/emotion">
                        <div>
                            <img className="footerImg" src={community} />
                        </div>
                        <div>
                            은혜나눔
                        </div>
                    </Link>
                </div>
                <div className="footer">
                    <Link className="footerLink" to="/basic/myPage">
                        <div>
                            <img className="footerImg" src={my} />
                        </div>
                        <div>
                            My
                        </div>
                    </Link >
                </div>
            </div>
        </>
    );
};

export default Footer;
