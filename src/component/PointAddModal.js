import React,{useState} from 'react'
import ReactDom from "react-dom";
import { useNavigate, } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import {ReactComponent as BackArrow} from "../asset/svgs/Back.svg"

const PointAddModal=({isOpen,close})=> {
    const navigate =useNavigate();
    const [point,setPoint] = useState(0);
    const modalRoot = document.getElementById('portal');
    const handlePointChange = (e) => {
      setPoint(e.target.value); // 입력값을 point 상태에 저장
    };
  
    const handleNavigate = () => {
      // navigate 시 point 값을 state로 전달
      navigate('/payment', { state: { point } });
    };
  

    return ReactDom.createPortal(
        <StyleModal isOpen={isOpen} onRequestClose={close} style={{
            overlay:{ backgroundColor: 'rgba(0, 0, 0, 0.2)', }
          }} >
        <ModalContents>
            <ModalHeader>
                <BackArrow onClick={close}/>
                <Span0>{'포인트 추가'}</Span0> 
            </ModalHeader>
            <ContentDiv>
              <PointInput 
              placeholder='얼마나 충전할까요?'
              value={point}
              onChange={handlePointChange}
              />
              <Sdiv>
              <CurrentPoint>현재 보유량 {(230000).toLocaleString()}</CurrentPoint>
              </Sdiv>
              <Buttons>
                <Button5000 onClick={() => setPoint(prevPoint => prevPoint +5000)}>5000 단추</Button5000>
                <Button10000 onClick={() => setPoint(prevPoint => prevPoint +10000)}>10000 단추</Button10000>
                <Button50000 onClick={() => setPoint(prevPoint => prevPoint +50000)}>50000 단추</Button50000>
              </Buttons>
        
            </ContentDiv>
            <ButtonDiv>
            <Button2 onClick={handleNavigate}>추가하기</Button2>
              
            </ButtonDiv>
            
        </ModalContents>
        
    </StyleModal>,
    modalRoot
    )


}

export default PointAddModal;

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
const Buttons=styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    gap: 8px;
`
const Button5000=styled.button`
    width: 25%;
    height: 100%;
    border-radius: 8px;
    border: none;
    background-color: #444448;
    cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color:rgb(44, 44, 44);
  }

`
const Button10000=styled.button`
    width: 25%;
    height: 100%;
    border-radius: 8px;    
    border: none;
    background-color: #444448;
    cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color:rgb(43, 43, 43);
  }
   
`
const Button50000=styled.button`
    width: 25%;
    height: 100%;
    border-radius: 8px;
    border: none;
    background-color: #444448;
    cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color:rgb(44, 44, 44);
  }


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

const Button2=styled.button`
  width: 100%;
  height: 53px;
  background-color: #08AC72;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color: #45a049;
  }
  

`