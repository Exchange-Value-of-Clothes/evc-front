import React,{useCallback,useState} from 'react'
import ReactDom from "react-dom";
import Modal from 'react-modal';
import styled from 'styled-components';
import {ReactComponent as BackArrow} from "../asset/svgs/Back.svg"
import PointAddModal from './PointAddModal';



const PointModal=({isOpen,close})=> {
    const modalRoot = document.getElementById('portal');
    const [isOpenAdd,setIsOpenAdd]=useState(false);
    const setModalAdd=useCallback(()=>{
        
      setIsOpenAdd((prev)=>!prev);
          
    },[])
  
    

    return ReactDom.createPortal(
    <StyleModal isOpen={isOpen} onRequestClose={close} style={{
      overlay:{ backgroundColor: 'rgba(0, 0, 0, 0.1)', }
    }} >
        <ModalContents>
            <ModalHeader>
                <BackArrow onClick={close}/>
                <Span0>{'경매하기'}</Span0> 
            </ModalHeader>
            <ContentDiv>
              <PointInput placeholder='얼마나 사용할까요?'/>
              <Sspan> 호가 단위로 추가하여 입력해주세요</Sspan>
              <Sdiv>
              <CurrentPoint>현재 보유량 {(230000).toLocaleString()}</CurrentPoint>
              </Sdiv>
            

            </ContentDiv>
            <ButtonDiv>
            <Button1 onClick={setModalAdd}>포인트 충전하기</Button1>
            <Button2>입찰하기</Button2>
              
            </ButtonDiv>
            
        </ModalContents>
        <PointAddModal  isOpen={isOpenAdd} close={setModalAdd}
       
        ></PointAddModal>

    </StyleModal>,
    modalRoot
    )


}

export default PointModal;

const StyleModal=styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  max-height: 246px;
  background-color: #2C2C2E;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  z-index: 99;
  
 
  
`
const ModalContents=styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 8px;

`
const ModalHeader=styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
`

const Span0=styled.span`
  margin-left: 20px;
  font-size: 20px;
  font-family: 'NeoEB',sans-serif;
  margin-right: 40%;
`
const Sdiv=styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const ContentDiv=styled.div`
  margin-top: 16px;
  width: 100%;
  height: 117px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const ButtonDiv=styled.div`
  width: 100%;
  height: 53px;
  display: flex;
  justify-content: space-between;

`
const Sspan=styled.span`
  font-family: 'NeoM',sans-serif;
  color: #FF453A;
  font-size: 14px;
  margin-left: 11px;

`

const PointInput=styled.input`
  width: 100%;
  min-height: 44px;
  background-color: #1C1C1E;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  &::placeholder{
    color: #FFFFFF80;
  }
`
const CurrentPoint=styled.span`
  color:#919191;
  font-family: 'NeoM',sans-serif;
  font-size: 14px;
`
const Button1=styled.button`
  width: 48%;
  height: 53px;
  background-color: #757575;
  border: none;
  border-radius: 8px;


`
const Button2=styled.button`
  width: 48%;
  height: 53px;
  background-color: #08AC72;
  border: none;
  border-radius: 8px;
  

`