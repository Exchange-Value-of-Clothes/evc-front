import React from 'react'
import eximg from '../asset/image/후드티.jpg'
import {ReactComponent as Selling} from "../asset/svgs/selling.svg"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as Chat} from "../asset/svgs/chat.svg"


function ChatCard({ onClick , roomid,cursor,lastChat}) {
 
    
  
  return (
  
    <ItemCard onClick={onClick}>
    
        <CardImgBox>
          <CardImg src={ eximg } alt=""/>
         
        </CardImgBox>
      
        <CardTextBox>
            <CardTitleDiv>
                <Title>{roomid}</Title> 
                <SellingIcon/>
            </CardTitleDiv>
            <CardUploadTime>{cursor}</CardUploadTime>
            <LastChatDiv>
                <LastChat>{lastChat}</LastChat>
                <NotReadChat>
                    <Chat/>
                    <Count>
                        {"안읽은채팅수"}
                    </Count>
                </NotReadChat>
            </LastChatDiv>
            
        </CardTextBox>
    
       
    </ItemCard> 
 
  )
}

export default ChatCard


const ItemCard = styled.div`  
  box-sizing: border-box;
  width: 100%;
  min-height: 120px;
  padding: 8px 16px;
  gap: 16px;
  display: flex;
  border-bottom: ${props => (props.$border?'solid 1px #4A4A4A':'none')};
`
const CardImgBox = styled.div`
  background-color: #2C2C2E;
  min-width: 100px;
  height: 100px;
  border-radius: 4px;
  position: relative;

`
const CardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`
const CardTextBox = styled.div`
  color: #F4F4F4;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`
const CardTitleDiv = styled.div`
  height: 24px;
  font-size: 16px;
  font-family: 'NeoM',sans-serif;
  display: flex;
  justify-content: space-between;
  align-items:center;
  
`
const Title= styled.div`
    font-size: 16px;
    font-family: 'NeoM',sans-serif;
    max-height:24px;
    width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis; 
    overflow: hidden;
`
const CardUploadTime = styled.div`
  color: #919191;
  font-size: 12px;
  font-family: 'NeoM',sans-serif;
  height: 24px;
  display: flex;
  align-items: center;

`

const SellingIcon =styled(Selling)`

`

const NotReadChat=styled.div`
    color: white;
    display: flex;
    gap: 6px;
    font-family: 'NeoM',sans-serif;
    align-items: center;
    font-size: 16px;
    
`
const LastChatDiv=styled.div`
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items:center;

`
const LastChat=styled.div`
    font-size: 16px;
    font-family: 'NeoEB',sans-serif;
    max-height:24px;
    width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis; 
    overflow: hidden;
`
const Count=styled.span`
    font-family: 'NeoM',sans-serif;
    align-items: center;
    font-size: 16px;
` 
    