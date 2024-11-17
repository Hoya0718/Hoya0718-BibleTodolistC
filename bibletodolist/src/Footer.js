import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <Link to="/basic">홈</Link> | 
            <Link to="/basic/main3">이어보기</Link> |  
            <Link to="/basic/main4">성경검색</Link> |  
            <Link to="/basic/main5">마이페이지</Link>
        </div>
    );
};

export default Footer;
