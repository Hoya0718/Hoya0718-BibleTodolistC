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
                    <div>
                        <img className="footerImg" src={home} />
                    </div>
                    <div>
                        <Link className="footerLink" to="/basic">홈</Link>
                    </div>
                </div>
                <div className="footer">
                    <div>
                        <img className="footerImg" src={bible} />
                    </div>
                    <div>
                        <Link className="footerLink" to="/basic/main3">성경</Link>
                    </div>
                </div>
                <div className="footer">
                    <div>
                        <img className="footerImg" src={community} />
                    </div>
                    <div>
                        <Link className="footerLink" to="/basic/main4">은혜나눔</Link>
                    </div>
                </div>
                <div className="footer">
                    <div>
                        <img className="footerImg" src={my} />
                    </div>
                    <div>
                        <Link className="footerLink" to="/basic/main5">My</Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Footer;
