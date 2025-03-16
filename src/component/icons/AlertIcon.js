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




