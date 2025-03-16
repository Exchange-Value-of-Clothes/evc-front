import React from 'react'
import { refreshAccessToken } from "../../api/authApi"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as Search} from '../../asset/svgs/Search.svg'


function SearchIcon() {
  const click = async()=>{
    console.log("요청드가자")

   await refreshAccessToken();
  }
  return (
    
    <SearchIcons onClick={click}> </SearchIcons>
  
  )
}

export default SearchIcon


const SearchIcons = styled(Search)`
   
`


