import { BrowserRouter,Route, Routes,useNavigate  } from 'react-router-dom';
import Main from "./page/main"
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Itempage from "./page/Itempage"
import GlobalStyle from './style/GlobalStyle'
import React, { useState, useEffect } from "react";
import './App.css'


function App() {
  const SplashScreen = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate("/login"); // 3초 후 /home으로 이동
    
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [navigate]);
  
    return (
      <div className="container">
     
        <div className="flash-screen">
          <h1 style={{color:' #16FF00'}}>SPLASH</h1>
        </div>
      </div>
      
    );
  };
  return (
    <div className="App">
      <GlobalStyle/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/item/*" element={<Itempage/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      </BrowserRouter>
  

    </div>
  );
}

export default App;
