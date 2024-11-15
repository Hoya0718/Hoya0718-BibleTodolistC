import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Hello from "./Components/Hello/Hello";
import Login from "./Components/Login/Login";
import Join from "./Components/Join/Join";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer"

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
