import React from 'react'
import styled from 'styled-components';
import Footer from '../component/Footer'
import eximg0 from '../asset/image/샌즈.jpg'
import eximg from '../asset/image/후드티.jpg'
import eximg2 from '../asset/image/엄2.jpeg'
import eximg3 from '../asset/image/엄3.jpeg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ReactComponent as Selling} from "../asset/svgs/sellingInpage.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {ReactComponent as Time} from "../asset/svgs/Time.svg"
import {ReactComponent as Eye} from "../asset/svgs/eye.svg";
import BackIcon from '../component/icons/BackIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import formatNumber from '../util/formatNumber';
import 'swiper/css';
import 'swiper/css/pagination';

 
function Itempage() {


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

                    <SellingIcon>
                        <Selling/>
                    </SellingIcon>
                    
                    <StyledSwiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    >
                    <SwiperSlide>  <PageImg src={ eximg } alt=""/>  </SwiperSlide>
                    <SwiperSlide>  <PageImg src={ eximg2 } alt=""/>  </SwiperSlide>
                    <SwiperSlide>  <PageImg src={ eximg3 } alt=""/>  </SwiperSlide>
                    </StyledSwiper>
                
                </PageImgBox>
                <PageEtcBox>

                    <PageTitleBox>
                        <span style={{fontSize:'25px'}}>샌즈</span> 
                    </PageTitleBox>

                    <PageTextBox>

                    <Brief> 와 샌즈 </Brief>

                    <EtcBox>
                        <Upload>
                            <Time/>22:00
                        </Upload> 
                        <View>
                            <Eye/>56 
                        </View>
                    </EtcBox>

                    </PageTextBox>
                    <PriceBox>

                    <Price>{
                    (32000).toLocaleString()}원</Price>
                    <DealButton>거래하기 </DealButton>
                    
                    </PriceBox>
                    
                    <StoreBox>

                    <ProfileBox>
                        <Profile src={ eximg0 } alt=""/>
                        
                    </ProfileBox>
                    <StoreName>
                        준식의 경매 
                    </StoreName>
                    <div className='itempage-store-liked'>
                        <FavoriteBorderIcon />
                        <div className='tempage-store-liked-count'>6만</div>
                    </div>

                    </StoreBox>
                
                </PageEtcBox>

                <DescriptBox>
                    <Descript>
                        



                    </Descript>
                    
                    <RemainTimeDiv>
                        <BottomFirstBox>
                            <ElementBox>
                                <TimeIcon/>
                                <RemainTime>
                                    남은시간 12:00
                                </RemainTime>
                            </ElementBox>
                            <CurrentPrice>현재가격 {
                              (32000).toLocaleString()}원
                            </CurrentPrice>
                        </BottomFirstBox>
                        <BottomSecondBox>
                            <BuyButton>
                                경매하기
                            </BuyButton>
                        </BottomSecondBox>          
                    </RemainTimeDiv>
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
const SellingIcon = styled.svg`
  position: absolute;
  bottom: 10px;
  right: 10px;
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
`
const EtcBox=styled.div`
  width: 25%;
  display: flex;
  justify-content: space-evenly;

`
const Upload=styled.span`
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

  color: #F4F4F4;
  font-size: 20px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
 

`
const StyledSwiper = styled(Swiper)`
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
`

const RemainTimeDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 10vh; 
    background-color: #2C2C2E;
    bottom: 0;
    flex-shrink: 0; 
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    padding: 10px; 
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
    font-size: 90%; 
`;

const CurrentPrice = styled.span`
    font-size: 90%; 
    margin-top: 15px;
`;
const BottomSecondBox =styled.div`
    height: 100%;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;

`
const BuyButton=styled.button`
    width: 70%;
    height: 60%;
    border-radius: 8px;
    border: none;
    background-color: #444448;
    font-size: 80%;

`
