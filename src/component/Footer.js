import React from 'react'
import { Link } from 'react-router-dom';
import {ReactComponent as Auction} from "../asset/svgs/auction.svg"
import {ReactComponent as Register} from "../asset/svgs/register.svg"
import {ReactComponent as Home} from "../asset/svgs/home2.svg"
import {ReactComponent as Chat} from "../asset/svgs/chat.svg"
import {ReactComponent as Mypage} from "../asset/svgs/user.svg"
import {ReactComponent as HomeGreen} from "../asset/svgs/HomeGreen.svg"
import {ReactComponent as RegisterGreen} from "../asset/svgs/AddGreen.svg"
import {ReactComponent as AuctionGreen} from "../asset/svgs/AuctionGreen.svg"
import {ReactComponent as ChatGreen} from "../asset/svgs/ChatGreen.svg"
import {ReactComponent as MypageGreen} from "../asset/svgs/UserGreen.svg"
import styled from 'styled-components';
import useStore from '../store/store';

function Footer() {
  const currentPage = useStore((state) => state.currentPage);

  const getIcon = (path) => {
    switch (path) {
      case 'home':
        return currentPage === '/home' ? <HomeGreen /> : <Home />;
      case 'register':
        return currentPage === '/register' ? <RegisterGreen /> : <Register />;
      case 'auction':
        return currentPage === '/auction' ? <AuctionGreen /> : <Auction />;
      case 'chat':
        return currentPage === '/chat' ? <ChatGreen /> : <Chat />;
      case 'mypage':
        return currentPage === '/mypage' ? <MypageGreen /> : <Mypage />;
      default:
        return null;
    }
  };

  return (

    <FooterBox>
      <AuctionBox to="/auction" style={{ textDecoration: "none" }} isActive={currentPage === '/auction'}>
          {getIcon('auction')}경매장
      </AuctionBox>
      <RegisterBox to="/register" style={{ textDecoration: "none" }} isActive={currentPage === '/register'}>
          {getIcon('register')}등록
      </RegisterBox>
      <HomeBox to="/home" style={{ textDecoration: "none" }} isActive={currentPage === '/home'}>
          {getIcon('home')}홈
      </HomeBox>
      <ChatBox to="/chat" style={{ textDecoration: "none" }} isActive={currentPage === '/chat'}>
          {getIcon('chat')}채팅
      </ChatBox>
      <MypageBox to="/mypage" style={{ textDecoration: "none" }} isActive={currentPage === '/mypage'}>
          {getIcon('mypage')}마이 페이지
      </MypageBox>
  </FooterBox>
  );
}

export default Footer;

const FooterBox = styled.div`
  background-color: #2C2C2E;
  color: #fff;
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
 
`;

const LinkBox = styled(Link)`
  color: ${(props) => (props.isActive ? '#16FF00' : '#F4F4F4')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 20%;
  
  @media (max-width: 400px) {
    font-size: 70%;
  }
`;

const AuctionBox = styled(LinkBox)``;
const RegisterBox = styled(LinkBox)``;
const HomeBox = styled(LinkBox)``;
const ChatBox = styled(LinkBox)``;
const MypageBox = styled(LinkBox)``;



