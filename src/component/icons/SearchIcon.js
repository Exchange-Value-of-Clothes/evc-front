import React from 'react'

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SearchIcon() {
 
  return (
    <SearchButton>
       <Search> </Search>
    </SearchButton>
  )
}

export default SearchIcon

const SearchButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`
const Search = styled.svg`
    width: 100%;
    height: 100%;

`


