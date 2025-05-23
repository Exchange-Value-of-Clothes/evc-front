import React,{useState,useCallback,useEffect,useRef} from 'react'
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../component/Footer'
import eximg0 from '../asset/image/defaultImg.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ReactComponent as Selling} from "../asset/svgs/sellingInpage.svg"
import {ReactComponent as Heart} from "../asset/svgs/pagesmallht.svg"
import {ReactComponent as Time} from "../asset/svgs/Time.svg"
import {ReactComponent as Eye} from "../asset/svgs/eye.svg";
import {ReactComponent as UserAdd} from "../asset/svgs/user_add.svg";
import BackIcon from '../component/icons/BackIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import Modal from 'react-modal';
import {ReactComponent as Cancle} from "../asset/svgs/Cancle.svg"
import AuctionModal from '../component/AuctionModal';
import { getSpecAucItem,createAuc } from '../api/ItemApi';
import {connectToRoom} from '../hook/useChat'
import 'swiper/css';
import 'swiper/css/pagination';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Timer } from '../util/timer';



const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;
 
function Itempage() {
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpen,setIsOpen]=useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [items,setItems]=useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const { startPrice, id } = location.state || {};
  const [stompClient, setStompClient] = useState(null);
  const stompClientRef = useRef(null); // stompClient를 useRef로 관리
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [current,setCurrent]=useState('');
  const [man,setMan] =useState('')
  const [displayCount, setDisplayCount] = useState('');

  
  
   useEffect(() => {
      fetchItem();
      
    }, [id]);
    useEffect(() => {
      if (items?.currentPrice !== undefined) {
        setCurrent(items.currentPrice);
      }
    }, [items]);
    useEffect(()=>{
      let client;
      const initStompClient = async () => {
          try {
            const response = await createAuc(id); // 전체 응답
            const newRoomId = response.auctionRoomId; // 진짜 roomId 추출
            client = await connectToRoom(newRoomId,'auction');
            stompClientRef.current = client;
            setStompClient(client);
            setConnectionStatus('connected');
            const topicPath = `/topic/auction-room.${newRoomId}`;
            client.subscribe(topicPath, (message) => {
              const text = message.body;
              let payload;
            
              try {
                // JSON 형태면 객체로 파싱
                payload = JSON.parse(text);
              } catch (e) {
                // 순수 텍스트면 content 프로퍼티로 감싸서 사용
                payload = { content: text };
              }
            
            
              // payload.currentPrice 가 있으면 current state 에 저장
              if (payload.currentPrice !== undefined) {
                setCurrent(payload.currentPrice);
              }
               if (payload.participantCount !== undefined) {
                setMan(payload.participantCount);
              }
              
            
              
            });
             
           
          } catch (error) {
            console.error('WebSocket 연결 실패:', error);
        console.error('Error details:', error.message); // error message를 출력
        setConnectionStatus('disconnected');
          }
        };
      
        initStompClient();
       
        return () => {
          if (stompClientRef.current) {
            stompClientRef.current.deactivate(); // WebSocket 연결 종료

            setConnectionStatus('disconnected');
          }
        };
      }, [id]);
  const fetchItem = async () => {
      try {
        const data = await getSpecAucItem(id); // 아이템 데이터 가져오기
        setItems(data); // 데이터 상태 업데이트
        setDisplayCount(data.participantCount); // 데이터 상태 업데이트

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
  

  const setModal=useCallback(()=>{
    
      setIsOpen((prev)=>!prev);
      
    },[])
    useEffect(() => {
  if (man !== undefined && man !== null) {
    setDisplayCount(man);
  }
}, [man]);
  if (loading) {
    return <div>로딩 중...</div>; // 로딩 페이지 표시
  }
    return (

        <PageStyle>
            <PageMain>
                <PageImgBox>

                    <BackIconBox>
                        <BackIcon/>
                    </BackIconBox>

                    <EtcIcon>
                        <MoreVertIcon/>
                    </EtcIcon>

                   
                    
                    
                    <StyledSwiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    
                    >
                     {items.imageNameList&&items.imageNameList.map((img, index) => (
                        <SwiperSlide key={index} onClick={() => openModal(index)}>  
                          <PageImg src={`${IMG_URL}/${img}`} alt={`Slide ${index + 1}`} />
                        </SwiperSlide>
                      ))}
                    </StyledSwiper>
                
                </PageImgBox>
                <PageEtcBox>
                    <IconDiv>
                      <TransactionType>{items.transactionType==='DIRECT'?'직거래':'택배배송'} </TransactionType>
                      <Category>{items.category}</Category>
                    </IconDiv>
                    <PageTitleBox>
                        <Titlespan style={{fontSize:'25px'}}>{items.title}</Titlespan> 
                    </PageTitleBox>


                  

                    <EtcBox>
                        <Upload>
                            <Time/>{formatTimeAgo(items.startTime)}
                        </Upload> 
                        <View>
                            <Eye/>{items.viewCount}
                        </View>
                        <Liked>
                          <Heart/>{items.likeCount}
                        </Liked>
                        <UserIconDiv>
                          <UserAdd/>{displayCount} 
                        </UserIconDiv>
                    </EtcBox>

               
                    <PriceBox>

                    <Price>{
                    (startPrice).toLocaleString()}원</Price>
                  
                    
                    </PriceBox>
                    
                    <StoreBox>
                      <ProfileBox>
                        <Profile src={items.profileImageName?`${IMG_URL}/${items.profileImageName}`:eximg0} alt=""/>
                      </ProfileBox>
                      <StoreName>{items.marketNickname}의 상점</StoreName>
                    
                    </StoreBox>
                
                </PageEtcBox>

                <DescriptBox>
                    <Descript>
                        

                        {items.content}

                    </Descript>
                    
                    <RemainTimeDiv>
                        <BottomFirstBox>
                            <ElementBox>
                                <TimeIcon/>
                                <RemainTime>
                                    <Timer endTime={items.endTime}/>
                                </RemainTime>
                            </ElementBox>
                            <CurrentPrice>현재가격 {
                              (current).toLocaleString()}원
                            </CurrentPrice>
                        </BottomFirstBox>
                        <BottomSecondBox>
                            <BuyButton onClick={setModal}>
                                경매하기
                            </BuyButton>
                        </BottomSecondBox>          
                    </RemainTimeDiv>
                </DescriptBox>
            
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
                        {items.imageNameList&&items.imageNameList.map((img, index) => (
                          <SwiperSlide key={index}>
                            <ModalImgBox>
                              <ModalImg src={`${IMG_URL}/${img}`} alt={`Modal Slide ${index + 1}`} />
                            </ModalImgBox>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </ModalContent>
            </StyledModal>
            <AuctionModal isOpen={isOpen} close={setModal}
            id={id}
            stompClient={stompClient}
            bidprice={items.bidPrice}
            myPoint={items.point}
            currentPrice={current}
            />
            
        </PageStyle>
    )
}

export default Itempage

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
  z-index: 0 !important;
  
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
const EtcIcon=styled.svg`
  position: absolute;
  top: 10px;
  right: 0px;
  width: 12%;
  height: 12%;
  z-index: 2;
`

const PageEtcBox=styled.div`
  width: 100%;
 
  height: 229px;
  border-bottom: solid 1px #4A4A4A;
  padding: 16px;
  box-sizing: border-box;

`
const PageTitleBox=styled.div`
  display: flex;
  justify-content: space-between;
  
`
const Titlespan = styled.span`
  font-family: 'NeoEB',sans-serif;
  font-size: 20px;
`

const EtcBox=styled.div`
  width: 100%;
  display: flex;
  > *:not(:last-child) {
    /* 세로선 */
    border-right: 1px solid #868686;
    /* 텍스트랑 선 사이 간격 */
    padding-right: 8px;
    margin-right: 8px;
  }

`
const Upload=styled.div`
  color: #919191;
  font-size: 12px;
  display: flex;
  gap: 3px;
  font-family: 'NeoM',sans-serif;
  align-items: center;

`

const View=styled.div`
 color: #919191;
 font-size: 12px;
 display: flex;
 gap: 3px;
 font-family: 'NeoM',sans-serif;
 align-items: center;


`
const Liked=styled.div`
 color: #919191;
 font-size: 12px;
 display: flex;
 gap: 3px;
 font-family: 'NeoM',sans-serif;
 align-items: center;

`
const UserIconDiv=styled.div`
 color: #919191;
 font-size: 12px;
 display: flex;
 gap: 3px;
 font-family: 'NeoM',sans-serif;
 align-items: center;

`


const PriceBox=styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  
  height: 17%;
`
const Price=styled.span`
  font-size: 20px;
  font-family: 'NeoEB',sans-serif;
  margin-top: 4px;
  margin-bottom: 4px;

`
const StoreBox=styled.div`
 background-color:#2C2C2E ;
  margin-top: 1%;
  width: 100%;
  padding: 16px;
  height: 72px;
  border-radius:8px;
  display: flex;
  gap: 5%;
  box-sizing: border-box;
  display: flex;
  align-items: center;

`
const ProfileBox=styled.div`
  width: 54px ;
  height: 54px; 
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
  color: #F4F4F4;
 
`
const DescriptBox=styled.div`

  color: #F4F4F4;
  font-size: 20px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
 

`
const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%;
  height: 100%;
 
 

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;


    display: flex;
    justify-content: center;
    align-items: center;
  
  }
 

  .swiper-pagination {
    bottom: 10px;
  }
`;

const Descript=styled.span`
 padding: 16px;
 flex: 1;
 font-family: 'NeoM',sans-serif;
 font-size: 20px;
`

const RemainTimeDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 13dvh; 
    background-color: #2C2C2E;
    bottom: 0;
    flex-shrink: 0; 
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    padding: 10px; 
    border-bottom: 1px solid #212025 ;
`;

const BottomFirstBox = styled.div`
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ElementBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; 
`;

const TimeIcon = styled(Time)`
    width: 10%;
    height :100%;
  
`;

const RemainTime = styled.span`
    font-size: 16px; 
   
    font-family: 'NeoM',sans-serif;
`;

const CurrentPrice = styled.span`
    font-size: 16px;
    margin-top: 10px;
    font-family: 'NeoEB',sans-serif;
`;
const BottomSecondBox =styled.div`
    height: 100%;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;

`
const BuyButton=styled.button`
    width: 90px;
    height: 40px;
    border-radius: 8px;
    border: none;
    background-color: #444448;
    font-size: 16px;
    font-family: 'NeoM',sans-serif;
    cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color:rgb(44, 44, 44);
  }
    
`
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


const IconDiv=styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`
const TransactionType= styled.div`
  width: 59px;
  height: 24px;
  background-color: #16FF00;
  font-family: 'NeoM',sans-serif;
  color: #1C1C1E;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border:none;
  border-radius: 4px;
`
const Category= styled.div`
  width: 59px;
  height: 24px;
  background-color: #444448;
  font-family: 'NeoM',sans-serif;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border:none;
  border-radius: 4px;

`