import React from 'react';
import styled from 'styled-components';
import defaultImg from '../asset/image/defaultImg.png'

const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;

function ChatCard({ data,onClick , roomid,cursor,lastChat}) {
  return (
  
    <ItemCard onClick={onClick}>
    
        <CardImgBox>
          <CardImg src={data.profileImageName?`${IMG_URL}/${data.profileImageName}` : defaultImg} alt=""/>
         
        </CardImgBox>
      
        <CardTextBox>
            <CardTitleDiv>
                <Title>{data.otherNickname}</Title> 
            </CardTitleDiv>
            <CardUploadTime>{cursor}</CardUploadTime>
            <LastChatDiv>
                <LastChat>{lastChat}</LastChat>
                {/*<NotReadChat>
                    <Chat/>
                    <Count>
                        {"안읽은채팅수"}
                    </Count>
                </NotReadChat>*/}
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
  justify-content: space-between;
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

    