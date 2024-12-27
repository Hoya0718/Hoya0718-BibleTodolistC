import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        const userId = sessionStorage.getItem("user_id");
        if (userId) {
            navigate("/basic");
        } else {
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* 404 애니메이션 텍스트 */}
            <div className="relative">
                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
                    404
                </h1>
            </div>

            {/* 설명 텍스트 */}
            <div className="text-center mt-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    페이지를 찾을 수 없습니다
                </h2>
                <p className="text-gray-600 mb-8">
                    죄송합니다. 요청하신 페이지가 존재하지 않거나<br/>
                    이동되었을 수 있습니다.
                </p>
            </div>

            {/* 홈으로 가기 버튼 */}
            <button
                onClick={handleNavigate}
                className="relative overflow-hidden px-8 py-4 bg-blue-500 text-white rounded-lg 
                          hover:bg-blue-600 transition-colors duration-300 shadow-lg 
                          transform hover:scale-105 active:scale-95"
            >
                홈으로 돌아가기
            </button>

            {/* 추가 설명 */}
            <p className="mt-8 text-sm text-gray-500 text-center max-w-sm">
                올바른 URL을 입력했는지 확인하시거나,<br/>
                위 버튼을 클릭하여 홈페이지로 이동하실 수 있습니다.
            </p>

            {/* 배경 장식 */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"/>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"/>
        </div>
    );
};

export default Error;