import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function EtcIcon() {
   
  return (
    <EtcButton>
       <Etc></Etc>
    </EtcButton>
  )
}

export default EtcIcon

const EtcButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`
const Etc = styled.svg`
    width: 100%;
    height: 100%;

`


