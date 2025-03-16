import React,{useState,useEffect} from 'react'
import CommonBox from '../style/CommonBox'
import styled from 'styled-components'
import Footer from '../component/Footer'
import Header from '../component/Header'
import {ReactComponent as Bell} from '../asset/svgs/Bell.svg'
import {ReactComponent as Bellx} from '../asset/svgs/Bellx.svg'
import AlertCard from '../component/AlertCard'
import {ReactComponent as Auction} from "../asset/svgs/auction.svg"

function Notifications() {
  const savedAlertState = localStorage.getItem('isAlert') === 'true';
  const [isAlert,setIsAlert]=useState(savedAlertState);

  useEffect(() => {
    localStorage.setItem('isAlert', isAlert); 
  }, [isAlert]);

  const toggleAlert=()=>{
    setIsAlert(!isAlert);
  }
  return (
    <CommonBox>
      <PageStyle>
        <Header title={'알림'} rightIcon={isAlert===true?<Bell onClick={toggleAlert}/>:<Bellx onClick={toggleAlert}/>}/>
        <AppMain> 
          <AlertCard icon={<Auction/>} title={'경매장'} text={'회원님이 찜하신 품목이 아직 판매중이에요!'}/>

          
    
                    
        </AppMain>
        <Footer/>
      </PageStyle>
    </CommonBox>
  )
}

export default Notifications

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const AppMain=styled.div`
  flex:1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  gap:1px;
  flex-shrink: 0; 

`
