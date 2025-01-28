import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as Bell} from '../../asset/svgs/Bell.svg'


function AlertIcon() {
  
  return (
 
        <Link to={'/alert'} style={{display:'flex', textDecoration: "none",color:'white'}}>
            <Bell/>                
        </Link>
    
  )
}

export default AlertIcon

const AlertButton = styled.div`

    display: flex;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`
const Alert = styled.svg`
   width: 10%; 
   height: 10%;

`


