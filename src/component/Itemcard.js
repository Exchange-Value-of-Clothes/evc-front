import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import {ReactComponent as Selling} from "../asset/svgs/selling.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function Itemcard({item, extraIcon, onClick }) {
 
    const navigate = useNavigate();
  
    const handleCardClick = () => {
      navigate(`/item/${item.usedItemId}`); // 
    }
    const formatTimeAgo=(date)=> {
      
      const parsedDate = new Date(date); // 받아온 날짜 문자열을 Date 객체로 파싱
      return formatDistanceToNow(parsedDate,  { addSuffix: true, locale: ko }); // '30초 전' 형식으로 변환
    }

    return (
      <ItemCard onClick={handleCardClick}>
        <CardImgBox>
          <CardImg src={item.imageURLs[0] || 'default_image_url.jpg'} alt={item.title} /> {/* 이미지 URL을 item에서 받아오기 */}
          {item.transactionStatue==="RESERVE"&& (
            <Overlay>
              <OverlayText>예약 중</OverlayText>
            </Overlay>
          )}
        </CardImgBox>
        
        <CardTextBox>
          <CardTitleDiv>
            <Title>{item.title}</Title> {/* 아이템 제목 표시 */}
            <IconsDiv>
              <SellingIcon />
              {extraIcon && (
                <Extrabutton onClick={onClick}>
                  {extraIcon}
                </Extrabutton>
              )}
            </IconsDiv>
          </CardTitleDiv>
          <CardUploadTime>{formatTimeAgo(item.createAt) || "00:00"}</CardUploadTime> {/* 업로드 시간 표시 */}
          <CardPriceDiv>{(item.price).toLocaleString()}원
          <CardLiked>
            <FavoriteBorderIcon />
            {item.likeCount || 0} {/* 좋아요 수 */}
          </CardLiked>
            </CardPriceDiv> {/* 가격 표시 */}
          
          
        </CardTextBox>
      </ItemCard>
    );
  }
  
  export default Itemcard;


Itemcard.defaultProps = {
  extraIcon: null, 
  border:null
};

const ItemCard = styled.div`  
  box-sizing: border-box;
  width: 100%;
  padding: 8px 16px;
  gap: 16px;
  display: flex;
  min-height: 120px;
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
  font-family: 'NeoEB',sans-serif;
`
const CardTextBox = styled.div`
  color: #F4F4F4;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

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
const CardPriceDiv = styled.div`
  width: 100%;
  height: 24px;
  font-size: 18px;
  font-family: 'NeoEB',sans-serif;
  display: flex;
  justify-content: space-between;

`
const SellingIcon =styled(Selling)`

`
const CardLiked = styled.div`
  color: white;
  display: flex;
  gap: 6px;
  font-family: 'NeoM',sans-serif;
  align-items: center;

`

const Extrabutton =styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: -9.5px;
  display: flex;
  align-items: center;
`
const IconsDiv = styled.div`
  display: flex;
  align-items: center;

`