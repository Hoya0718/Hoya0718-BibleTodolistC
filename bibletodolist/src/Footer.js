import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

import home from './img/home.png'
import bible from './img/bible.png'
import community from './img/community.png'
import my from './img/my.png'

const Footer = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('user_role');

        navigate('/');
    }
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
                    <Link className="footerLink" to="/basic/main3">
                        <div>
                            <img className="footerImg" src={bible} />
                        </div>
                        <div>
                            성경
                        </div>
                    </Link>
                </div>

                <div className="footer">
                    <Link className="footerLink" to="/basic/main4">
                        <div>
                            <img className="footerImg" src={community} />
                        </div>
                        <div>
                            은혜나눔
                        </div>
                    </Link>
                </div>
                <div className="footer">
                    <Link className="footerLink" to="/basic/main5">
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
