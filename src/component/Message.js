import React from 'react'
import styled from 'styled-components'
import eximg from '../asset/image/샌즈.jpg'
import {formatTime} from '../util/formatTime'

function Message({profile,user,msg,time}) {
    
  return (
    <MessageForm isMe={user==='me'}>
        {user!=='me'&&
        (<MessageProfile>
            <ProfileImg src={profile||eximg} alt='' />
        </MessageProfile>)
        }
        <MessageText isMe={user === 'me'}>
        {msg}
        </MessageText>
        
        <SendTimeDiv>
            
            <SendTime isMe={user === 'me'}>{formatTime(time)}</SendTime>
        </SendTimeDiv>
        
    </MessageForm>
  )
}

export default Message

const MessageForm=styled.div`
    max-width: 85%;
    height: 100%;
    display: flex;
    gap: 8px;
    
    flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
`
const MessageProfile=styled.div`
    min-height: 36px;
    min-width: 36px;
    max-height: 36px;
    max-width: 36px;
   
    border-radius: 50%;
    overflow: hidden;
`
const ProfileImg=styled.img`
    width: 36px;
    height: 36px;
    object-fit: cover;
`
const MessageText=styled.div`
    background-color: ${({ isMe }) => (isMe ? '#08AC72' : '#444448')}; 
    padding: 8px;
    font-family: 'NeoSB',sans-serif;
    border-radius: 4px;
    max-width: 70%;
    
    overflow-wrap: break-word; 
    img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    display: block;
  }
     
`
const SendTimeDiv=styled.div`
    width: 45px;
    height: 100%;
    display: flex;
    justify-content: end;
 
    flex-direction: column;
   
`
const SendTime=styled.span`
    font-family: 'NeoEB',sans-serif;
    font-size: 10px;
    display: flex;
    justify-content: ${({ isMe }) => (isMe ? 'end' : 'start')}; 

`
