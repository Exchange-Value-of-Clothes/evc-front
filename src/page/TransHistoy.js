import React,{useState}from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import Itemcard from '../component/Itemcard';
 
function TransHistory() {
    
  return (
    <CommonBox >
        <PageStyle>
            <Header2 title={"거래 내역"} icon={<BackIcon/>}></Header2>
           
               
                
            <AppMain>
                <Itemcard />
                <Itemcard/>

                <Itemcard />

           
            </AppMain>
            <Footer/>
        </PageStyle>
    </CommonBox>
  )
}

export default TransHistory

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



