import React from "react";
import Login from "./Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./Signup"
import Home from "./Home"
import DodajWpis from "./DodajWpis"
import AktualizujWpis from "./AktualizujWpis";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dodaj" element={<DodajWpis />} />
        <Route path="/edit/:id" element={<AktualizujWpis />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
