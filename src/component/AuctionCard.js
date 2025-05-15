import React from 'react'
import styled from 'styled-components'
import {ReactComponent as Heart} from '../asset/svgs/AuctionHeart.svg'
import {ReactComponent as TimeIcon} from '../asset/svgs/Time.svg'
import { useNavigate } from 'react-router-dom'
import formatNumber from '../util/formatNumber';
import { Timer } from '../util/timer';


const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;

function AuctionCard({item,imgName  }) {

    const price=100000
    const navigate = useNavigate();
  
    const handleCardClick = () => {
      navigate(`/auction_item/${item.auctionItemId}`,{
        state:{
        startPrice:item.startPrice,
        id:item.auctionItemId,
        }
      }); // 
    }
    

    return (
        <ContentsBox  onClick={handleCardClick}>
            <ImgBox>
                <Img src={`${IMG_URL}/${encodeURIComponent(imgName)}` || 'default_image_url.jpg'} alt=''/>
            </ImgBox>
            <StatusBox>
                <span style={{fontFamily:'NeoM,sans-serif',fontSize:'16px'}}>{item.title}</span>
                
                <ParticipantsBox>
                    <ExSpan>108명 참여중</ExSpan>
                </ParticipantsBox>
                <HeartIcon/>
            </StatusBox>
           
            <PriceDiv>
                <PriceBox>
                    <PriceType>호가 단위</PriceType>
                    <Price>{price > 100000 ? formatNumber(item.bidPrice) : (item.bidPrice).toLocaleString()}원 </Price>
                </PriceBox>
                <PriceBox>
                    <PriceType>시작 가격 </PriceType>
                    <Price>{price > 100000 ? formatNumber(item.startPrice) : (item.startPrice).toLocaleString()}원 </Price>
                </PriceBox>
                <PriceBox>
                    <PriceType>현재 가격 </PriceType>
                    <Price> {price > 100000 ? formatNumber(item.currentPrice) : (item.currentPrice).toLocaleString()}원</Price>
                </PriceBox>
            </PriceDiv>
            <RemainTimeDiv>
                <Clock/>
                <RemainTime><Timer endTime={item.endTime}/></RemainTime>
            </RemainTimeDiv>
        </ContentsBox>
    )
}

export default AuctionCard

const ContentsBox = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 55%;
    padding: 0 3px;
    border-bottom: solid 1px #4A4A4A;
    min-height: 375px;

`
const ImgBox = styled.div`
    width: 100%;
    height: 55%;
    background-color:gray;
    border-radius: 8px;
    min-height: 180px;

`
const Img =  styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;

`
const StatusBox = styled.div`
    margin-top: 3%;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

`
const ParticipantsBox = styled.div`
    height: 95%;
    width: 30%;
    border-radius: 16px;
    border: solid #16FF00 1px;
    font-size: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left:auto ;

`
const HeartIcon = styled(Heart)`    
    
    width: 5%;
    height: 100%;

`
const PriceDiv = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-around;
    

`
const PriceBox = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 
`
const PriceType = styled.span`
    color: #919191;
    font-size: 12px;
    font-family: 'NeoM',sans-serif;

`
const Price = styled.span`
    font-size: 16px;
    font-family: 'NeoEB',sans-serif;

  
`

const RemainTimeDiv = styled.div`
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: end;
`
const Clock=styled(TimeIcon)`
    height: 100%;
    width: 5%;
    margin-right: 2%;
`
const RemainTime=styled.span`
    color: #919191;
  
`
const ExSpan=styled.span`
    color: #16FF00;
`