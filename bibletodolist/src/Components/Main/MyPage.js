import React from "react";

const MyPage = () => {

    const myComment = () => {}
    const myloveverse = () => {}

    return (
        <>
            <ul>
                <li>내가 쓴 댓글 - <button onClick={myComment}>바로가기</button></li>
                <li>내가 좋아요 한 성경 구절 - <button onClick={myloveverse}>바로가기</button> </li>
            </ul>
        </>
    )
}

export default MyPage;