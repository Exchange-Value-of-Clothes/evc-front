import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function BackIcon() {
    const navigate = useNavigate();

    const handleBack=()=>{
        navigate(-1);

    }
  return (
    <BackButton onClick={handleBack}>
       <Back><ArrowBackIosIcon/></Back>
    </BackButton>
  )
}

export default BackIcon

const BackButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`
const Back = styled.svg`
    width: 100%;
    height: 100%;

`


