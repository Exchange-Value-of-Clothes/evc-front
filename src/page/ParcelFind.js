import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import defaultImg from '../asset/image/defaultImg.png'
import Footer from '../component/Footer';
import { useNavigate} from 'react-router-dom';
import {ReactComponent as BackArrow} from "../asset/svgs/Back.svg"
import { getOrderList } from '../api/ItemApi';
const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;

function ParcelFInd() {
  const [cursor,setCursor] = useState([]);
  const [orders,setOrders] =useState([]);
  const [loading, setLoading] = useState(true);
  
    const navigate = useNavigate();
    const handleBack=()=>{
        navigate(-1);

    }
    
    const fetchList = async () => {
        try {
          const response = await getOrderList();
    
          if (!response ) {
            console.error(" response가 존재하지 않음!");
            return;
          }
          setOrders(response.content)
          
          setCursor(response.cursor);
    
        } catch (err) {
          console.error("❌ 방 목록 조회 실패:", err);
         
        } finally {
          setLoading(false);
        }
      };
      useEffect(()=>{
        fetchList()

      },[])
      
   return (
    <CommonBox>
      <PageStyle>
        <HeaderBox>
          <HeaderContent>
            <HeaderIcons>
              <HeaderLeft onClick={handleBack}><BackArrow /></HeaderLeft>
            </HeaderIcons>
            <HeaderTitle>택배조회</HeaderTitle>
         

          </HeaderContent>
        </HeaderBox>
        <AppMain>
           <ContentBox>
            {Array.isArray(orders) && orders.map((order) => (
              <Items key={order.orderId} onClick={() => navigate(`/DetailParcel/${order.orderId}`)}>
                <ItemImg src={order.imageName?`${IMG_URL}/${order.imageName}` : defaultImg} alt=''/>
                <Sdiv>
                  <ItemTitle>{order.title}</ItemTitle>
                  <OrderId>{order.orderId}</OrderId>

                </Sdiv>
               
              </Items>
            ))}
          </ContentBox>
            
          
              
           
        </AppMain>
        <Footer />


      </PageStyle>
    </CommonBox>
   )
 }
 
 export default ParcelFInd

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
  gap: 16px;
  box-sizing: border-box;

`

const HeaderBox=styled.div`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    background-color:#2C2C2E;
    padding: 15px 20px;
    font-size: 20px;
    display: flex;


`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap  : 10px ;
`;

const HeaderTitle = styled.div`
  font-size: 20px;
 
`;
const OrderId = styled.div`
  font-size: 16px;
 
`;
const HeaderIcons = styled.div`
    display: flex;
    gap: 20px;
   
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  width: 100%; 
  height: 100%;

`;
const ContentBox=styled.div`
   
  
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`
const Items =styled.div`
  height: 85px;
  width: 100%;
  padding: 16px;
  display: flex;
  gap: 16px;
  box-sizing: border-box;

`
const ItemImg=styled.img`
  width: 48px;
  height: 48px;
`
const ItemTitle=styled.div`
  font-size: 16px;
  font-family: 'NeoEB',sans-serif;

`
const Sdiv=styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'NeoR',sans-serif;
`
