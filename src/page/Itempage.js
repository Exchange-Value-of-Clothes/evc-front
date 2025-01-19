import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../component/Footer'
import eximg from '../asset/image/샌즈.jpg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {ReactComponent as Selling} from "../asset/svgs/sellingInpage.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {ReactComponent as Time} from "../asset/svgs/Time.svg"
import {ReactComponent as Eye} from "../asset/svgs/eye.svg"
import {ReactComponent as Heart} from "../asset/svgs/pagesmallht.svg"
import {ReactComponent as Chat} from "../asset/svgs/Chat_alt_2 (1).svg"

 


function Itempage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };
  return (
    <PageStyle>
    <PageMain>
     
      <PageImgBox>
        <BackIcon><ArrowBackIosIcon 
        onClick={handleBack}/></BackIcon>
        <EtcIcon><MoreVertIcon/></EtcIcon>
        <SellingIcon><Selling/></SellingIcon>
        <PageImg src={ eximg } alt=""/>
      </PageImgBox>
      <PageEtcBox>
        <PageTitleBox><span style={{fontSize:'25px'}}>샌즈</span> 
        </PageTitleBox>
        <PageTextBox>
          <Brief>와 샌즈</Brief>
          <EtcBox>
            <Upload><Time/>22:00</Upload>
            <Liked><Heart/>14 </Liked>
            <View><Eye/>56 </View>
            <Chats><Chat/>5</Chats>
          </EtcBox>

        </PageTextBox>
        <PriceBox> 
          <Price>40,000원</Price>
          <DealButton>거래하기 </DealButton>
        </PriceBox>
        
        <StoreBox>
          <ProfileBox>
            <Profile src={ eximg } alt=""/>
            
          </ProfileBox>
          <StoreName>
            준식의 상점
          </StoreName>
          <div className='itempage-store-liked'>
            <FavoriteBorderIcon />
            <div className='tempage-store-liked-count'>6만</div>
          </div>
        </StoreBox>
      
      </PageEtcBox>

      <DescriptBox>
      제품설명
      

      </DescriptBox>
      
    </PageMain>
    <Footer/>
    </PageStyle>
  )
}

export default Itempage

const PageStyle=styled.div`
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #ddd; 
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
  object-fit:cover;
  
`
const BackIcon=styled.svg`
  position: absolute;
  top: 10px;
  left:15px;
  width: 12%;
  height: 12%;
`
const EtcIcon=styled.svg`
  position: absolute;
  top: 10px;
  right: 0px;
  width: 12%;
  height: 12%;
`
const SellingIcon = styled.svg`
  position: absolute;
  bottom: 10px;
  right:15px;
  width: 12%;
  height: 12%;
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

`
const PageTextBox=styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;

`
const Brief=styled.div`
  font-size: 16px;
`
const EtcBox=styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;

`
const Upload=styled.span`
  color: #919191;
  font-size: 12px;
  display: flex;
  gap: 3px;

`
const Liked=styled.span`
  color: #919191;
  font-size: 12px;
  display: flex;
  gap: 3px;

`
const View=styled.span`
 color: #919191;
 font-size: 12px;
 display: flex;
 gap: 3px;

`
const Chats=styled.span`
 color: #919191;
 font-size: 12px;
 display: flex;
  gap: 3px;

`

const PriceBox=styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 10px;
  
  height: 17%;
`
const Price=styled.span`
  font-size: 20px;
`
const DealButton=styled.button`
  color:#F4F4F4;
  background-color: #444448;
  border-radius: 8px;
  width: 20%;
  height: 100%;
  border: none;

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
  color: #F4F4F4;
  margin-right:40%;
  margin-top: 3%;
`
const DescriptBox=styled.div`
  padding: 16px;
  color: #F4F4F4;
  font-size: 20px;

`