import React from 'react'
import styled from 'styled-components'
import {ReactComponent as Auction} from "../asset/svgs/auction.svg"


function AlertCard() {
  return (
    <CardBox>
        <IconBox> <Auction/> </IconBox>
        <TextBox>
            <TitleDiv>경매장 </TitleDiv>
            <TextDiv> 회원님이 찜하신 품목이 아직 판매중이에요!</TextDiv>
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

`
const TitleDiv = styled.div`

`
const TextDiv = styled.div`

`
const More=styled.div`
    font-size: 12px;
    color: #919191;
`
