import React from 'react'
import styled from 'styled-components'
import CommonBox from '../style/CommonBox'
import Footer from '../component/Footer'
import Header from '../component/Header'
import {ReactComponent as PointPlus} from '../asset/svgs/PointPlus.svg'
import AlertIcon from '../component/icons/AlertIcon'
import {ReactComponent as Filter} from "../asset/svgs/Filter_alt.svg"
import {ReactComponent as Search} from '../asset/svgs/Search.svg'
import AuctionCard from '../component/AuctionCard'

function Auction() {
  return (
    <CommonBox>
        <PageStyle>
            <Header title={'홈'} leftIcon={<Search/>} rightIcon={<AlertIcon/>}/>
            <PageFilter>
                <FilterDiv><Filter/>필터</FilterDiv>
                <RemainPointBox>잔여단추<RemainPoin>{(23000000000).toLocaleString()}</RemainPoin><PointPlus/></RemainPointBox>
            </PageFilter>
            <AppMain>
                <AuctionCard/>
                <AuctionCard/>
                <AuctionCard/>
                <AuctionCard/>
                <AuctionCard/>
                <AuctionCard/>
                <AuctionCard/>
                <AuctionCard/>
                <AuctionCard/>
                <AuctionCard/>
        
                
            </AppMain>
            <Footer/>
        </PageStyle>
    </CommonBox>
  )
}

export default Auction

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
`
const PageFilter=styled.div`
  padding: 10px;
  gap:8px;
  display: flex;
  height: 5%;
  justify-content: space-between;
  align-items: center;
`

const AppMain=styled.div`
  flex:1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  gap: 25px;
`

const FilterDiv=styled.div`
  background-color: #17161B;
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18%;
  height: 100%;

`
const RemainPointBox=styled.div`
    background-color: #000000;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 40%;
    height: 80%;
    margin-right: 2%;
    font-size: 80%;
  
`
const RemainPoin=styled.span`
    overflow-x: scroll;
    scrollbar-width: none;
    width: 40%;

`