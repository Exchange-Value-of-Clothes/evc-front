import React from 'react'
import CommonBox from '../style/CommonBox'
import styled from 'styled-components'
import Footer from '../component/Footer'
import Header from '../component/Header'
import {ReactComponent as Bell} from '../asset/svgs/Bell.svg'
import AlertCard from '../component/AlertCard'

function Notifications() {
  return (
    <CommonBox>
      <PageStyle>
        <Header title={'알림'} rightIcon={<Bell/>}/>
        <AppMain> 
          <AlertCard/>

          
    
                    
        </AppMain>
        <Footer/>
      </PageStyle>
    </CommonBox>
  )
}

export default Notifications

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const AppMain=styled.div`
  flex:1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  gap:1px;
  flex-shrink: 0; 

`
