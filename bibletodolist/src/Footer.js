import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
       sessionStorage.removeItem('user_id');
       sessionStorage.removeItem('user_role');
       
       navigate('/');
    }
    return (
        <div>
            <Link to="/basic">홈</Link> | 
            <Link to="/basic/main3">이어보기</Link> |  
            <Link to="/basic/main4">성경검색</Link> |  
            <Link to="/basic/main5">마이페이지</Link>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default Footer;
