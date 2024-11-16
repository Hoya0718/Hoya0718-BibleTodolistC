import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Hello from "./Components/Hello/Hello";
import Login from "./Components/Login/Login";
import Join from "./Components/Join/Join";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer"
import ChooseTestament from "./Components/ChooseTestament/ChooseTestament";
import Map from"./Map";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/chooseTestament" element={<ChooseTestament />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
