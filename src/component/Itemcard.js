import React from 'react'
import eximg from '../asset/image/후드티.jpg'
import {ReactComponent as Selling} from "../asset/svgs/selling.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function Itemcard() {
  
    const navigate = useNavigate();
  
    const handleCardClick = () => {
      navigate(`/item/1`); // 
    }
  
  return (
  
    <ItemCard  onClick={handleCardClick}>
    
        <CardImgBox>
          <CardImg src={ eximg } alt=""/>
          <Overlay>
                <OverlayText>예약 중</OverlayText>
          </Overlay>
         
        </CardImgBox>
        <CardTextBox>
            <CardTitle><div>샌즈</div></CardTitle>
            <CardUploadTime><span>22:00</span></CardUploadTime>
            <CardPrice><div>{ (32000).toLocaleString()}원</div></CardPrice>
        </CardTextBox>
        <CardEtcBox>
            <CardState><Selling/></CardState>
            <CardLiked><FavoriteBorderIcon/>121</CardLiked>
        </CardEtcBox>
    </ItemCard> 
 
  )
}

export default Itemcard

const ItemCard = styled.div`  
  box-sizing: border-box;
  width: 100%;
  height: 17%;
  padding: 8px;
  gap: 15px;
  display: flex;
  min-height: 120px;

`
const CardImgBox = styled.div`
  background-color: #2C2C2E;
  width: 25%;
  height: 100%;
  border-radius: 8px;
  position: relative;

`
const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:#00000070;
  display: flex;
  justify-content: center;
  align-items: center;
`

const OverlayText = styled.div`
  color: white;
  font-size: 18px;
  font-weight: bold;
`
const CardTextBox = styled.div`
  color: #F4F4F4;
  width: 48%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

`
const CardTitle = styled.div`
  margin-left: 0%;
  font-size: 16px;

`
const CardUploadTime = styled.div`
  color: #919191;
  font-size: 12px;

`
const CardPrice = styled.div`
  font-size: 16px;

`
const CardEtcBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;

`
const CardState = styled.div`
  margin-right: 10px;
`
const CardLiked = styled.div`
  color: white;
  margin-right: 8%;
  margin-bottom: 35%;
  display: flex;
  gap: 6px;
`
