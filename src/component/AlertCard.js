import React from 'react'
import styled from 'styled-components'


function AlertCard({icon, title, text}) {
  return (
    <CardBox>
        <IconBox> {icon} </IconBox>
        <TextBox>
            <TitleDiv>{title}</TitleDiv>
            <TextDiv> {text}</TextDiv>
            <More> 더보기</More>
        </TextBox>
    </CardBox>
  ) 
}

export default AlertCard

const CardBox=styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 120px;
  padding: 10px;
  gap: 15px;
  display: flex;
  border-bottom: solid #4A4A4A 1px ;
`
const IconBox=styled.div`
width: 15%;
height: 100%;
display: flex;
justify-content: center;

`
const TextBox = styled.div`
display: flex;
flex-direction: column;
width: 85%;
height: 100%;
gap: 15px;
padding: 3px;
padding-right: 10%;
`
const TitleDiv = styled.div`
  font-family: 'NeoM',sans-serif;
`
const TextDiv = styled.div`
  font-family: 'NeoM',sans-serif;

`
const More=styled.div`
    font-size: 12px;
    color: #919191;
    font-family: 'NeoM',sans-serif;

`
