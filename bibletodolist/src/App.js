import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Hello from "./Hello";
import Login from "./Login";
import Join from "./Join";
import Main from "./Main";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
