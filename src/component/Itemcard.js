import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StateIcon from './icons/StateIcon';
import LikedIcon from './icons/LikedIcon';
const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;
/*추가로 할거 목록 

xx의상점에 프사 url추가되면 추가 (중고,경매 개별페이지)

중고상품 수정 api
경매상품 수정 api

*/
function Itemcard({item,imgName, extraIcon, onClick,isAuc,id2,isliked }) {
    const navigate = useNavigate();
    const ids = isAuc ? (id2 || item.auctionItemId) : (id2 || item.usedItemId);
    const handleCardClick = () => {
      if(isAuc==='AUCTION'){
        
        navigate(`/auction_item/${ids}`,{
          state:{
          startPrice:item.price,
          id:ids,
          initialCounts:item.likeCount,
          isLiked:item.isLike||isliked

          }
        }); 
      }
      else{
        navigate(`/item/${ids}`,{
          state:{
          initialCounts:item.likeCount,
          isLiked:item.isLike||isliked
          }
        }); 
      }
    }
    const formatTimeAgo=(date)=> {   
      const parsedDate = new Date(date); // 받아온 날짜 문자열을 Date 객체로 파싱
      return formatDistanceToNow(parsedDate,  { addSuffix: true, locale: ko }); // '30초 전' 형식으로 변환
    }
    const transactionInfo = {
      SELL: { color: '#5AC8FA', text: '판매' },
      BUY: { color: '#FF6F0F', text: '구매' },
      AUCTION: { color: '#16FF00', text: '경매' },
    };
    const { color, text } = transactionInfo[item.transactionMode] || { color: '#ccc', text: 'none' };

    return (
      <ItemCard onClick={handleCardClick}>
        <CardImgBox>
          <CardImg src={`${IMG_URL}/${encodeURIComponent(imgName)}` || 'default_image_url.jpg'} alt={item.title} /> 
          {item.transactionStatus==="RESERVE"&& (
            <Overlay>
              <OverlayText>예약 중</OverlayText>
            </Overlay>
          )}
        </CardImgBox>
        
        <CardTextBox>
          <CardTitleDiv>
            <Title>{item.title}</Title> {/* 아이템 제목 표시 */}
            <IconsDiv>
              <StateIcon color={color} text={text} />
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
            <LikedIcon itemId={isAuc===true?item.auctionItemId||item.itemId :item.usedItemId||item.itemId}
            itemType={isAuc===true?'AUCTIONITEM':'USEDITEM'}
            initialLiked={isliked||item.isLike}
            initialCount={item.likeCount}
            />
           
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
  flex-shrink: 0;  // 이미지 영역 고정

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
  overflow: hidden; /* 텍스트 박스 오버플로우 방지 */
  flex: 1; /* 이미지 외 영역 전체 차지 */
  min-width: 0; /* text-overflow: ellipsis 작동을 위해 */

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