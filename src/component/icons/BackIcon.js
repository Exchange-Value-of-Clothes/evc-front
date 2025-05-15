import React from 'react'
import {ReactComponent as BackArrow} from "../../asset/svgs/Back.svg"
import { useNavigate } from 'react-router-dom';

function BackIcon() {
    const navigate = useNavigate();

    const handleBack=()=>{
        navigate(-1);

    }
  return (
      <BackArrow  onClick={handleBack}/>
  )
}

export default BackIcon




