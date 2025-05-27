import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import Footer from '../component/Footer';
import { useNavigate,useParams} from 'react-router-dom';
import {ReactComponent as BackArrow} from "../asset/svgs/Back.svg"
import { getOrder } from '../api/ItemApi';

function ParcelFInd() {

  const navigate = useNavigate();
  const handleBack=()=>{
      navigate(-1);

  }
  const [data, setData] = useState({
  receipt: {
    orderId: '',
    orderType: '',
    status: '',
    priceInfo: {},
    histories: [],
  },
  pickup: {
    location: {
      basicAddress: '',
      detailAddress: '',
      latitude: 0,
      longitude: 0,
    },
    wishTime: '',
    contact: {
      name: '',
      phone: '',
    },
    note: '',
  },
  dropoff: {
    location: {
      basicAddress: '',
      detailAddress: '',
      latitude: 0,
      longitude: 0,
    },
    contact: {
      name: '',
      phone: '',
    },
    note: '',
  },
});

  const { id } = useParams();
  const fetchOrder = async () => {
          try {
            const response = await getOrder(id);
      
            if (!response ) {
              console.error(" response가 존재하지 않음!");
              return;
            }
            setData(response)
            
      
          } catch (err) {
            console.error("❌ 방 목록 조회 실패:", err);
            
          } 
    }
  useEffect(()=>{
    fetchOrder()

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
              <Fdiv>주문 아이디 <Idspan>{data.receipt.orderId}</Idspan></Fdiv>
              <Sdiv>기본정보
                <InfoDiv>
                  <Info1>
                    <InT1>주문타입</InT1>
                    <InC1>{data.receipt.orderType}</InC1>
                  </Info1>
                  <Info2>
                    <InT2>보내는분</InT2>
                    <InC2>{data.pickup.contact.name}</InC2>

                  </Info2>
                  <Info3>
                    <InT3>받는분</InT3>
                    <InC3>{data.dropoff.contact.name}</InC3>

                  </Info3>
                  
                </InfoDiv>
              </Sdiv>
              <Tdiv>배송 현황

                 <PostDiv>
                  <PostTitle>
                    <div>현재상태:{data.receipt.status}</div>
                    고객님이 주문하신 상품이 배송되고 있습니다.

                  </PostTitle>
                  <Postjuso>
                    <Juso>주소</Juso>
                    <JusoC>
                    {data.dropoff.location.basicAddress}{data.dropoff.location.detailAddress}
                    </JusoC>
                  </Postjuso>
                  <PostNote>
                    
                    <Note>
                      받는분 번호


                    </Note>
                    <NoteC>
                      {data.dropoff.contact.phone}

                    </NoteC>
                    

                  </PostNote>
                  
                  <PostNote>
                    
                    <Note>
                      보내는분 번호


                    </Note>
                    <NoteC>
                      {data.pickup.contact.phone}


                    </NoteC>
                   

                  </PostNote>
                  
                </PostDiv>
                
                  
                
              </Tdiv>
              
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
  gap: 24px;
  padding: 16px;
`
const Fdiv=styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  gap:8px;
`
const Sdiv=styled.div`
  width: 100%;
  height: 98px;
  display: flex;
  flex-direction: column;
  gap:8px;


`
const Tdiv=styled.div`
  display: flex;
  flex-direction: column;
  gap:8px;
  width: 100%;
  height: 211px;

`
const Idspan=styled.span`
  font-family: 'NeoR',sans-serif;
  border-bottom: 1px solid #F4F4F4;
`

const InfoDiv=styled.div`
  width: 100%;
  height: 66px;
  display: flex;
`
const PostDiv=styled.div`
  width: 100%;
  height: 227px;
 border: 1px solid #444448;
  border-radius: 8px;
`

const Info1=styled.div`
  width: 100%;
  height: 100%;
 border: 1px solid #444448;
 border-top-left-radius:8px ;
border-bottom-left-radius:8px ;

 display: flex;
 flex-direction: column;
`
 const InT1=styled.div`
  width: 100%;
  height: 50%;
  background-color: #444448;
    font-family: 'NeoR',sans-serif;
     border-top-left-radius:8px ;
      display: flex;
  align-items: center;
  justify-content: center;


`
const InC1=styled.div`
  width: 100%;
  height: 50%;
    font-family: 'NeoR',sans-serif;
     display: flex;
  align-items: center;
  justify-content: center;

`

const Info2=styled.div`
  width: 100%;
  height: 100%;
 border: 1px solid #444448;
 display: flex;
 flex-direction: column;
`
 const InT2=styled.div`
  width: 100%;
  height: 50%;
  background-color: #444448;
    font-family: 'NeoR',sans-serif;
     display: flex;
  align-items: center;
  justify-content: center;

`
const InC2=styled.div`
  width: 100%;
  height: 50%;
    font-family: 'NeoR',sans-serif;
     display: flex;
  align-items: center;
  justify-content: center;

`

const Info3=styled.div`
  width: 100%;
  height: 100%;
 border: 1px solid #444448;
 display: flex;
 flex-direction: column;
  border-top-right-radius:8px ;
border-bottom-right-radius:8px ;
`
 const InT3=styled.div`
  width: 100%;
  height: 50%;
  background-color: #444448;
  font-family: 'NeoR',sans-serif;
  border-top-right-radius:8px ;
  display: flex;
  align-items: center;
  justify-content: center;


`
const InC3=styled.div`
  width: 100%;
  height: 50%;
    font-family: 'NeoR',sans-serif;
     display: flex;
  align-items: center;
  justify-content: center;

`

const PostTitle=styled.div`
  width: 100%;
  height: 82px;
  background-color: #444448;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'NeoR',sans-serif;
  font-size: 18px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
`
const Postjuso=styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  border-bottom:1px solid #444448 ;
  font-size: 12px;
  
`
const Juso=styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'NeoR',sans-serif;
  border-right:1px solid #444448;
    font-size: 12px;

  
`
const JusoC=styled.div`
  width: 80%;
  height: 100%;
   display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'NeoR',sans-serif;
    font-size: 12px;


  
`
const PostNote=styled.div`
  width: 100%;
  height: 48px;
  display: flex;
    border-bottom:1px solid #444448 ;
      font-size: 12px;
      


 
`
const Note=styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'NeoR',sans-serif;
  border-right:1px solid #444448;
    font-size: 12px;

  
`
const NoteC=styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'NeoR',sans-serif;
    font-size: 12px;

  
`