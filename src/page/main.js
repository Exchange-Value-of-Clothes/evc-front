import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import CommonBox from "../style/CommonBox";
import {ReactComponent as Filter} from "../asset/svgs/Filter_alt.svg"
import {ReactComponent as Search} from '../asset/svgs/Search.svg'
import Itemcard from "../component/Itemcard";
import Footer from "../component/Footer";
import AlertIcon from "../component/icons/AlertIcon";


function App() {

  return (
    <CommonBox>
      <PageStyle>
          <Header title={'홈'} leftIcon={<Search/>} rightIcon={<AlertIcon/>}/>
          <PageFilter>
         
            <FilterDiv><Filter/>필터</FilterDiv>
            <EntireDiv>전체</EntireDiv>
            <SellDiv>판매</SellDiv>
            <BuyDiv>구매</BuyDiv>

          </PageFilter>
          <AppMain>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>
              <Itemcard/>

             
          </AppMain>
          
          <Footer/>
      </PageStyle>
    </CommonBox>
  );
}

export default App;

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
`
const FilterDiv=styled.div`
  background-color: #17161B;
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18%;

`
const EntireDiv=styled.div`
 background-color: #17161B;
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;

`
const SellDiv=styled.div`
  background-color: #17161B;
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;

`
const BuyDiv=styled.div`
  background-color: #17161B;
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;

`
const AppMain=styled.div`
  flex:1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  gap:1px;

`

