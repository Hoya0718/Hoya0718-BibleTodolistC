import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Hello from "./Components/Hello/Hello";
import Login from "./Components/Login/Login";
import Join from "./Components/Join/Join";

import Basic from "./Components/Main/Basic";
import Main from "./Components/Main/Main";

import Emotion from "./Components/Main/Emotion"
import TodoList from "./Components/Main/TodoList"
import Main5 from "./Components/Main/Main5"
import MyPage from "./Components/Main/MyPage"

import Footer from "./Footer";
import ChooseTestament from "./Components/ChooseTestament/ChooseTestament";
import Map from "./Map";

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
            <Route path="main5" element={<Main5 />}/>
            <Route path="myPage" element={<MyPage />}/>
            <Route path="chooseTestament" element={<ChooseTestament />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />

          <Route path="/map" element={<Map />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
