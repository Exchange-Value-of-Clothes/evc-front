import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import {ReactComponent as Filter} from "../asset/svgs/Filter_alt.svg"
import {ReactComponent as Bell} from '../asset/svgs/Bell.svg'
import {ReactComponent as Search} from '../asset/svgs/Search.svg'
import Itemcard from "../component/Itemcard";
import Footer from "../component/Footer";

function App() {

  return (
    <PageStyle>
          <Header title={'홈'} leftIcon={<Search/>} rightIcon={<Bell/>}/>
    
          <PageFilter>
         
            <FilterDiv><Filter/>필터</FilterDiv>
            <EntireDiv>전체</EntireDiv>
            <SellDiv>판매</SellDiv>
            <BuyDiv>구매</BuyDiv>

          </PageFilter>
          <AppMain>
              <Itemcard/>
          </AppMain>
          
          <Footer/>
    </PageStyle>
  );
}

export default App;

const PageStyle = styled.div`
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #ddd; 
  background-color: #1C1C1E;
  display: flex;
  flex-direction: column;
`
const Headers=styled.div`
  background-color:#2C2C2E;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  height: 10%;
`
const HeaderElement=styled.div`
  display: flex;
  gap: 16px;
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

