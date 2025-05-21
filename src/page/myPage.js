import React from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import defaultImg from '../asset/image/defaultImg.png'
import {ReactComponent as RightArrow} from "../asset/svgs/Rightarrow.svg"
import {ReactComponent as Card} from "../asset/svgs/Creditcard.svg"
import {ReactComponent as DanChu} from "../asset/svgs/DanChu.svg"
import {ReactComponent as Bill} from "../asset/svgs/Bill.svg"
import {ReactComponent as Ht} from "../asset/svgs/MyPageHt.svg"
import {ReactComponent as Boxes} from "../asset/svgs/Boxes.svg"
import { Link ,useNavigate} from 'react-router-dom';
import { useState,useCallback } from 'react';
import PointReturnModal from '../component/PointReturnModal'
import PointAddModal from '../component/PointAddModal'
import useFetchUser from '../hook/useFetchUser';
import { logoutApi } from '../api/authApi';

const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;

function MyPage() {
    const navigate = useNavigate();
    const { userInfo, fetchUser } = useFetchUser();
   
    const [openReturn,setOpenReturn]=useState(false);
    const setModalReturn=useCallback(()=>{
        
        setOpenReturn((prev)=>!prev);
            
    },[])
    const [openAdd,setOpenAdd]=useState(false);
    const setModalAdd=useCallback(()=>{
        
        setOpenAdd((prev)=>!prev);
            
    },[])
    const logout = async () => {
        try {
          await logoutApi(); // 서버에 로그아웃 요청
        } catch (error) {
          console.error('서버 로그아웃 실패:', error);
          // 서버 오류가 나도 클라이언트 로그아웃은 계속 진행
        } finally {
          localStorage.removeItem('LoginState');
          localStorage.removeItem('searchHistory');
          localStorage.removeItem('searchHistory_auc');
          navigate('/login');
        }
      };
  
  return (
    <CommonBox >
        <PageStyle>
           <Header2 title={"마이페이지"} icon={<BackIcon/>} ></Header2>
            <AppMain>
                <ProfileBox>
                    <ImgBox>
                        <ProfileImg src={userInfo.imageName?`${IMG_URL}/${userInfo.imageName}` : defaultImg} alt=''/>
                    </ImgBox>
                    <Profile>
                        <ProfileName><span style={{fontSize:'20px'}}>{userInfo.nickname}</span> 
                        <Link to={`/whostore/mystore`} 
                        state={{ profileImg: userInfo.imageName ? `${IMG_URL}/${userInfo.imageName}` : defaultImg,who:'나' }}
                        style={{display:'flex', textDecoration: "none"}}>
                            <ArrowIcon/>                
                        </Link>
                        </ProfileName>
                        <ProfileEtc> <Postspan > <span>{}</span></Postspan></ProfileEtc>{/*여기도 안쓸듯*/}
                    </Profile>
                </ProfileBox>

                <PointBox>
                    <PointDiv><DanchuIcon/><span style={{fontSize:'20px'}}>단추 포인트</span></PointDiv>
                    <Point><span style={{fontSize:'20px'}}>{(userInfo.point).toLocaleString()}</span></Point>
                    <ButtonDiv>
                        <AccountButton > 계좌 관리  </AccountButton>
                        <ChargeButton onClick={setModalAdd}> 충전하기 </ChargeButton>
                        <RefundButton onClick={setModalReturn}> 환급하기 </RefundButton>
                    </ButtonDiv>
                </PointBox>
                <LinkBox>
                    <BoxDiv>
                        <Link to={'/transhistory'} style={{textDecoration:'none'}}>
                            <HistoryBox>
                                    <Bill/> 거래내역
                            </HistoryBox>
                        </Link>
                        <Link to={'/watchlist'} style={{textDecoration:'none'}}>
                            <WatchListBox>
                                <Ht/> 관심목록
                            </WatchListBox>
                        </Link>
                        <Link to={'/ParcelFind'}  style={{textDecoration:'none'}}>
                            <TrackingBox>
                                <Boxes/> 배송조회
                            </TrackingBox>
                        </Link>
                      
                    </BoxDiv>
                </LinkBox>

                <EtcBox>
                   
                    
                    <EtcDiv>
                        <ProfileSetting><Link to={'/profilesetting'} style={{textDecoration:'none'}}>프로필 수정</Link></ProfileSetting>
                        <InfoSet><Link to={'/InfoSet'} style={{textDecoration:'none'}}>개인정보 작성</Link></InfoSet>
                        <Announcement>공지사항</Announcement>
                        <Question>자주 묻는 질문</Question>
                        <Inquiry>1:1 문의</Inquiry>
                        <Service>서비스 정보</Service>
                        <Logout onClick={logout}>로그아웃</Logout>
                    </EtcDiv>
             
                </EtcBox>
            </AppMain>
            <PointReturnModal  isOpen={openReturn} close={setModalReturn}
       
            ></PointReturnModal>
            <PointAddModal isOpen={openAdd} close={setModalAdd}>

            </PointAddModal>
           <Footer/>
        </PageStyle>
    </CommonBox>
    
  )
}

export default MyPage

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;


`

const AppMain=styled.div`
  flex:1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  gap:1px;

`

const ProfileBox = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 16px;

`
const PointBox = styled.div`
    box-sizing: border-box;

    width: 100%;
    height: 155px;
    background-color: #2C2C2E;
    padding: 16px;
`
const LinkBox = styled.div`
    width: 100%;
    height: 155px;
   
    box-sizing: border-box;
    padding: 16px;

`
const EtcBox = styled.div`
    width: 100%;
    height: 47%;
    overflow-y: scroll;
    scrollbar-width: none;
    padding: 16px;
    box-sizing: border-box;

`
const ImgBox=styled.div`
    width:  80px;
    height: 80px;
    @media (max-height: 700px){
        width:  64px;
        height: 64px;
    }
    border-radius: 50%; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    overflow: hidden; 
    margin-left: 5%;
`
const ProfileImg=styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;

`
const Profile=styled.div`
    height: 100%;
    width: 60%;
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;

`
const Postspan=styled.div`
    font-size:14px;
    font-family: 'NeoEB',sans-serif;
    display: flex;
    gap: 8px;
`
const PointDiv=styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;

`
const Point=styled.div`
    width: 100%;
    height: 30%;
   
`
const ButtonDiv=styled.div`
    width: 100%;
    height: 35%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
`
const ProfileSetting=styled.div`
    font-family: 'NeoEB',sans-serif;
    font-size: 16px;

`

const EtcDiv=styled.div`    
    border-bottom: solid 1px #4A4A4A;
    width: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap:16px;


`
const Announcement=styled.div`
    font-family: 'NeoEB',sans-serif;
    font-size: 16px;
`
const Question=styled.div`
    font-family: 'NeoEB',sans-serif;
    font-size: 16px;

`
const Inquiry=styled.div`
    font-family: 'NeoEB',sans-serif;
    font-size: 16px;

`
const Service=styled.div`
    font-family: 'NeoEB',sans-serif;
    font-size: 16px;

`
const ArrowIcon = styled(RightArrow)`
    
`
const ProfileName=styled.div`
    display: flex;
    align-items: center;
    gap: 6%;

`
const ProfileEtc=styled.div`

`
const DanchuIcon=styled(DanChu)`
    margin-right: 2%;
    margin-bottom: 1%;

`
const AccountButton = styled.button`
    background-color: #08AC72;
    border: none;
    border-radius: 8px;
    width: 30%;
    font-size: 16px;
    cursor: pointer;
`
const ChargeButton = styled.button`
    background-color: #444448;
    border: none;
    border-radius: 8px;
    width: 30%;
    font-size: 16px;
    cursor: pointer;


`
const RefundButton = styled.button`
    background-color: #444448;
    border: none;
    border-radius: 8px;
    width: 30%;
    font-size: 16px;
    cursor: pointer;


`
const BoxDiv=styled.div`
    background-color:#2C2C2E;
    border-radius: 8px;
    padding: 16px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    gap: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const HistoryBox=styled.div`
    width: 100px;
    height: 100px;
    background-color: #444448;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;

`
const WatchListBox=styled.div`
    width: 100px;
    height: 100px;
    background-color: #444448;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;

`
const TrackingBox=styled.div`
    width: 100px;
    height: 100px;
    background-color: #444448;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;

`

const InfoSet=styled.div`
    font-family: 'NeoEB',sans-serif;
    font-size: 16px;
`

const Logout=styled.div`
     font-family: 'NeoEB',sans-serif;
     font-size: 16px;
     cursor: pointer;

`





