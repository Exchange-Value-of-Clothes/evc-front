import { BrowserRouter,Route, Routes,useNavigate,useLocation  } from 'react-router-dom';
import Main from "./page/main"
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Itempage from "./page/Itempage"
import Notifications from './page/Notifications';
import GlobalStyle from './style/GlobalStyle'
import React, { useState, useEffect } from "react";
import './App.css'
import useStore from './store/store';
import Auction from './page/auction';
import AuctionItemPage from './page/AuctionItemPage'
import ScrollToTop from "./util/ScrollTop"


function App() {
  const location = useLocation();
  const setPage = useStore((state)=>state.setPage);

  useEffect(() => {
    setPage(location.pathname); // 페이지 위치가 변경될 때마다 상태 업데이트
  }, [location, setPage]);

  

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SplashScreen/>} />
        <Route path="/home" element={<Main/>} />
        <Route path="/item/*" element={<Itempage/>} />
        <Route path="/auction_item/*" element={<AuctionItemPage/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/alert" element={<Notifications/>} />
        <Route path="/auction" element={<Auction/>} />
      </Routes>
    
  

    </div>
  );
}

export default App;
