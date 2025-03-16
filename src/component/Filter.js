import React from 'react'
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import styled from 'styled-components';
import {ReactComponent as FilterIcon} from "../asset/svgs/Filter_alt.svg"


function Filter({filterShape,addAuc,selectedFilter, setSelectedFilter }) {
  return (
    <FilterDiv>
      {
        filterShape==='ham'?
        (<FilterIconDiv> <MenuSharpIcon/></FilterIconDiv>)

        :
        (<FilterIconDiv style={{width:'90px'}}> <FilterIcon/>필터</FilterIconDiv>)
      }
        
        <EntireDiv 
        selected={selectedFilter==='전체'}
        onClick={()=>setSelectedFilter('전체')}>전체</EntireDiv>
        <BuyDiv 
        selected={selectedFilter==='구매'}
        onClick={()=>setSelectedFilter('구매')}> 구매</BuyDiv>  
        <SellDiv 
        selected={selectedFilter==='판매'}
        onClick={()=>setSelectedFilter('판매')}>판매</SellDiv>
        {addAuc&&
        <AucDiv 
        selected={selectedFilter==='경매'}
        onClick={()=>setSelectedFilter('경매')}>경매</AucDiv>
        }
    </FilterDiv>
  )
}



export default Filter

const FilterDiv=styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding: 0 16px;
    gap:8px;
    display: flex;
    margin-top:16px;
   
`
const FilterIconDiv=styled.div`
    background-color: #17161B;
    color: #F4F4F4;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    font-family: 'NeoM',sans-serif;
`

const EntireDiv=styled.div`
  
  background-color:${({selected})=>(selected? '#353539':'#17161B')};
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 61px;
  font-family: 'NeoM',sans-serif;
`
const SellDiv=styled.div`
  background-color:${({selected})=>(selected? '#353539':'#17161B')};
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 61px;
  font-family: 'NeoM',sans-serif;

`
const BuyDiv=styled.div`
  background-color:${({selected})=>(selected? '#353539':'#17161B')};
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 61px;
  font-family: 'NeoM',sans-serif;
 
`
const AucDiv=styled.div`
  background-color:${({selected})=>(selected? '#353539':'#17161B')};
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 61px;
  font-family: 'NeoM',sans-serif;

`
