import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../component/Footer'
import eximg0 from '../asset/image/샌즈.jpg'
import {ReactComponent as Selling} from "../asset/svgs/sellingInpage.svg"
import {ReactComponent as Time} from "../asset/svgs/Time.svg"
import {ReactComponent as Eye} from "../asset/svgs/eye.svg"
import {ReactComponent as Heart} from "../asset/svgs/pagesmallht.svg"
import {ReactComponent as Chat} from "../asset/svgs/Chat_alt_2 (1).svg"
import BackIcon from '../component/icons/BackIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import {ReactComponent as Cancle} from "../asset/svgs/Cancle.svg"
import { getSpecUsedItem } from '../api/ItemApi';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import {ReactComponent as Report} from "../asset/svgs/Report.svg"
import { createRoom } from '../api/chatApi';
import {connectToRoom} from '../hook/useChat'

import 'swiper/css';
import 'swiper/css/pagination';
import Modal from 'react-modal';

function Itempage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [items,setItems]=useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    console.log(id);
    fetchItem();
    
  }, [id]);

  const fetchItem = async () => {
    try {
      const data = await getSpecUsedItem(id); // 아이템 데이터 가져오기
      setItems(data); // 데이터 상태 업데이트
  
      setLoading(false); // 로딩 상태 업데이트
    } catch (error) {
      console.error("아이템 정보를 가져오는 데 실패했습니다.", error);
      setLoading(false); // 로딩 상태 업데이트
    }
  };

  const openModal = (index) => {
    setCurrentImgIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const formatTimeAgo = (date) => {
    const parsedDate = new Date(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ko }); // '30초 전' 형식으로 변환
  };

  
  const createRoomEvent = async (itemId, memberId) => {
    try {
      const roomData = await createRoom(itemId, memberId);
  
      if (!roomData || !roomData.chatRoomId) {
        throw new Error("유효한 채팅방 ID를 받지 못했습니다.");
      }
  
      console.log("채팅방 생성 성공:", roomData);
  
      const roomId = roomData.chatRoomId;
  
      navigate(`/chat/rooms/${roomId}`);
  
    } catch (err) {
      console.error("채팅방 생성 실패:", err);
    }
  };
  

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 페이지 표시
  }
  return (
    <PageStyle>
      <PageMain>
        <PageImgBox>
          <BackIconBox><BackIcon/></BackIconBox>
          <EtcIcon><Report/></EtcIcon>
          <SellingIcon/>
          <StyledSwiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
          >
            {items.imageURLs&&items.imageURLs.map((img, index) => (
              <SwiperSlide key={index} onClick={() => openModal(index)}>  
                <PageImg src={img} alt={`Slide ${index + 1}`} />
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </PageImgBox>
        <PageEtcBox>
          <PageTitleBox><span style={{fontSize:'25px'}}>{items.title}</span></PageTitleBox>
          <PageTextBox>
            <Brief></Brief>
            <EtcBox>
              <Upload><Time/>{formatTimeAgo(items.createAt)}</Upload>
              <Liked><Heart/>{items.likeCount}</Liked>
              <View><Eye/>{items.viewCount}</View>
              <Chats><Chat/>{items.chattingCount}</Chats>
            </EtcBox>
          </PageTextBox>
          <PriceBox>
            <Price>{(items.price).toLocaleString()}원</Price>
            <DealButton
            disabled={items?.isOwned}
            onClick={() => createRoomEvent(id,items.memberId)}
            >거래하기</DealButton>
          </PriceBox>
          <StoreBox>
            <ProfileBox>
              <Profile src={eximg0} alt=""/>
            </ProfileBox>
            <StoreName>{items.nickName}의 상점</StoreName>
            <StorelikedDiv>
               {/*<FavoriteBorderIcon />
             <div className='tempage-store-liked-count' style={{fontSize:'12px',fontFamily:'NeoM,sans-serif'}}>6만</div>*/}
            </StorelikedDiv>
          </StoreBox>
        </PageEtcBox>
        <DescriptBox>{items.content}</DescriptBox>
      </PageMain>
      <Footer/>

      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        ariaHideApp={false}
        style={{
          overlay: { zIndex: 100 } 
        }}
       
      >
        <ModalContent>
          <CloseButton onClick={closeModal}>Close</CloseButton>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            initialSlide={currentImgIndex}
          >
            {items.imageURLs&&items.imageURLs.map((img, index) => (
              <SwiperSlide key={index}>
                <ModalImgBox>
                  <ModalImg src={img} alt={`Modal Slide ${index + 1}`} />
                </ModalImgBox>
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalContent>
      </StyledModal>
    </PageStyle>
  );
}

export default Itempage;

const PageStyle=styled.div`
  height: 100dvh;
  max-width: 480px;
  margin: 0 auto;

  background-color: #1C1C1E;
`
const PageMain=styled.div`
  flex:1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  height:90%;
  
  
`
const PageImgBox=styled.div`
  position: relative;
  width: 100%;
  height: 35%;
  
`
const PageImg=styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
`
const BackIconBox=styled.div`
  position: absolute;
  top: 10px;
  left:15px;
  width: 12%;
  height: 12%;
  z-index: 2;
`
const EtcIcon=styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
 
  z-index: 2;
`
const SellingIcon = styled(Selling)`
  position: absolute;
  bottom: 10px;
  right:15px;
  width: 12%;
  height: 12%;
  z-index: 2;
`
const PageEtcBox=styled.div`
  width: 100%;
  height: 30%;  
  min-height: 250px;
  border-bottom: solid 1px #4A4A4A;

`
const PageTitleBox=styled.div`
  display: flex;
  justify-content: space-between;
  padding:15px;
  font-family: 'NeoEB',sans-serif;
  font-size: 20px;
`
const PageTextBox=styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;

`
const Brief=styled.div`
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-x: scroll;
  scrollbar-width: none;
  font-family: 'NeoEB',sans-serif;
 
`
const EtcBox=styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;

`
const Upload=styled.span`
  color: #919191;
  font-size: 12px;
  display: flex;
  gap: 3px;
  font-family: 'NeoM',sans-serif;

`
const Liked=styled.span`
  color: #919191;
  font-size: 12px;
  display: flex;
  gap: 3px;
  font-family: 'NeoM',sans-serif;

`
const View=styled.span`
 color: #919191;
 font-size: 12px;
 display: flex;
 gap: 3px;
 font-family: 'NeoM',sans-serif;

`
const Chats=styled.span`
 color: #919191;
 font-size: 12px;
 display: flex;
  gap: 3px;
  font-family: 'NeoM',sans-serif;

`

const PriceBox=styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 10px;
  height: 17%;
`
const Price=styled.span`
  font-size: 20px;
  font-family: 'NeoEB',sans-serif;

`
const DealButton=styled.button`
  color:#F4F4F4;
  background-color: #444448;
  border-radius: 8px;
  width: 20%;
  height: 100%;
  border: none;
  font-family: 'NeoM',sans-serif;
  font-size: 16px;

`
const StoreBox=styled.div`
  background-color:#2C2C2E ;
  margin: 3% auto;
  width: 87%;
  padding: 16px;
  height: 20%;
  border-radius:8px;
  display: flex;
  justify-content: space-between;

`
const ProfileBox=styled.div`
  background-color: #F4F4F4;
  width:  14%; 
  height: 100%; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  overflow: hidden; 

`
const Profile=styled.img`
  width: 100%;
  height: 100%;
  object-fit:cover;

`
const StoreName=styled.div`
  font-size: 18px;
  font-size: 18px;
  color: #F4F4F4;
  margin-right:40%;
  margin-top: 3%;
`
const DescriptBox=styled.div`
  padding: 16px;
  color: #F4F4F4;
  font-size: 16px;
  font-family: 'NeoM',sans-serif;
`
const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-pagination {
    bottom: 10px;
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  outline: none;
  
`;


const ModalContent = styled.div`
  background-color: #1C1C1E; 
  padding-top:5%;
  width: 100%;
  max-width: 480px;
  height: 100dvh;
  object-fit: contain;
`;

const CloseButton = styled(Cancle)`
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const ModalImgBox=styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
`
const ModalImg=styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
`
const StorelikedDiv=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`