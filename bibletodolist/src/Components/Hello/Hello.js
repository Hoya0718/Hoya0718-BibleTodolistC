import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './Hello.css'


const Hello = () => {
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        fetch("/api/exam")
            .then((res) => {return res.json();})
            .then((data) => {setMessage(data.message);
            });
    }, []);

    return (
        <div>
            <div className="container">
                <div> <span id="title">Bible diary - {message}</span></div>
                <Link to="/home" className="open-btn">open</Link>
    
                <div className="bottom-buttons">
                    <Link to="login/" className="btn"><span className="icon">➡️</span>로그인</Link>
                    <Link to="join/" className="btn"><span className="icon">👤</span>회원가입</Link>
                </div>
            </div>
        </div>
    )
}

export default Hello;