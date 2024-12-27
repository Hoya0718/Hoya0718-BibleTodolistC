import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Hello from "./Components/Hello/Hello";
import Login from "./Components/Login/Login";
import Join from "./Components/Join/Join";

import Basic from "./Components/Main/Basic";
import Main from "./Components/Main/Main";

import Emotion from "./Components/Main/Emotion"
import TodoList from "./Components/Main/TodoList"
import Bible from "./Components/Main/Bible"
import MyPage from "./Components/Main/MyPage"

import Error from "./Components/Main/Error"
import Footer from "./Footer";
import ChooseTestament from "./Components/ChooseTestament/ChooseTestament";
import Suggestion from "./Components/Main/Suggestion";
import Suggest from"./Components/Main/Suggest";
import SearchWord from"./Components/Main/SearchWord";
import ContinueReading from "./Components/Main/ContinueReading";
import OAuth2Callback from "./Components/Login/OAuth2Callback";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hello />} />

          <Route path="/basic" element={<Basic />} >
            <Route index element={<Main />} />
            <Route path="emotion" element={<Emotion />}/>
            <Route path="todoList" element={<TodoList />}/>
            <Route path="bible" element={<Bible />}/>
            <Route path="myPage" element={<MyPage />}/>
            <Route path="chooseTestament" element={<ChooseTestament />} />
            <Route path="suggestion" element={<Suggestion />} />
            <Route path="searchWord" element={<SearchWord />} />
            <Route path="continueReading" element={<ContinueReading />} />
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/oauth2Callback" element={<OAuth2Callback />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
