import React from 'react'
import { Link } from 'react-router-dom';
import {ReactComponent as Auction} from "../asset/svgs/auction.svg"
import {ReactComponent as Register} from "../asset/svgs/register.svg"
import {ReactComponent as Home} from "../asset/svgs/home2.svg"
import {ReactComponent as Chat} from "../asset/svgs/chat.svg"
import {ReactComponent as Mypage} from "../asset/svgs/user.svg"
import './Footer.css'

function footer() {
  return (
    <footer className="app-footer">
        <div className="auctionIcon"><Auction/>경매장</div>
        <div className="registerIcon"><Register/>등록</div>
        <Link to={'/main'} style={{ textDecoration: "none",color:'white'}}>
          <div className="homeIcon"><Home/>홈</div>
        </Link> 
        <div className="chatIcon"><Chat/>채팅</div>
        <div className="mypageIcon"><Mypage/>마이 페이지</div>
      
     </footer>  
  )
}

export default footer