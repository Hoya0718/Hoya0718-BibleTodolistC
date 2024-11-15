import React from "react";
import {Link, useNavigate} from "react-router-dom"

import Footer from "../Footer/Footer"

const Main = () => {
    return(
        <div>
            <h1>임시 메인페이지</h1>
            <div>님 환영합니다</div>
            <Link to="">구약성경</Link> <span> | </span><Link to="">신약성경</Link>
            <br />
            <Link to="">검색</Link> <span> | </span><Link to="">책갈피</Link>

            <div>
                <span>오늘의 말씀 {}</span>
                {}
            </div>
            <div>
                <span>오늘의 잠언 </span>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Main;