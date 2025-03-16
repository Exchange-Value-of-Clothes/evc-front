import { Route, Routes,useNavigate,useLocation  } from 'react-router-dom';
import Main from "./page/main"
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Itempage from "./page/Itempage"
import Notifications from './page/Notifications';
import GlobalStyle from './style/GlobalStyle'
import React, { useEffect } from "react";
import './App.css'
import useStore from './store/store';
import Auction from './page/auction';
import AuctionItemPage from './page/AuctionItemPage'
import ScrollToTop from "./util/ScrollTop"
import MyPage from './page/myPage';
import ChatPage from './page/chatPage';
import RegisterPage from './page/registerPage';
import WhoStore from './page/WhoStore';
import TransHistory from './page/TransHistoy';
import WatchList from './page/WatchList';
import ProfileSetting from './page/ProfileSetting';
import PasswordPage from './page/PasswordPage';
import ChattingPage from './page/ChattingPage';
import Social from './page/social';
import {ReactComponent as EvcbigLogo} from './asset/svgs/Evc_bigLogo.svg'


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
          <EvcbigLogo/>
          
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
        <Route path="/item/:id" element={<Itempage/>} />
        <Route path="/auction_item/*" element={<AuctionItemPage/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/alert" element={<Notifications/>} />
        <Route path="/auction" element={<Auction/>} />
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/whostore/*" element={<WhoStore/>} />
        <Route path="/transhistory" element={<TransHistory/>} />
        <Route path="/watchlist" element={<WatchList/>} />
        <Route path="/profilesetting" element={<ProfileSetting/>} />
        <Route path="/passwordpage" element={<PasswordPage/>} />        <Route path="/passwordpage" element={<PasswordPage/>} />
        <Route path="/chat/rooms/:roomId" element={<ChattingPage/>} />        <Route path="/passwordpage" element={<PasswordPage/>} />
        <Route path="/social-login-success" element={<Social/>} />        <Route path="/passwordpage" element={<PasswordPage/>} />

       </Routes>

    </div>
  );
}

export default App;
