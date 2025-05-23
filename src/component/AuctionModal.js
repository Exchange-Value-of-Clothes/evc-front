import React,{useCallback,useState} from 'react'
import ReactDom from "react-dom";
import Modal from 'react-modal';
import styled from 'styled-components';
import {ReactComponent as BackArrow} from "../asset/svgs/Back.svg"
import PointAddModal from './PointAddModal';
import {sendPrice} from '../hook/useChat'
// q배팅 계산해서 예외처리필요
const PointModal=({isOpen,close,id, stompClient,bidprice,myPoint,currentPrice })=> {
    const modalRoot = document.getElementById('portal');
    const [isOpenAdd,setIsOpenAdd]=useState(false);
    const setModalAdd=useCallback(()=>{
        
      setIsOpenAdd((prev)=>!prev);
          
    },[])

  
    const [addPrice,setAddPrice] = useState('');

    const handlePriceChange = (e) => {
      const value = e.target.value;
  
      // 숫자만 입력받을 수 있도록 필터링 (빈 문자열, 숫자만 허용)
      if (/^\d*$/.test(value)) {
        setAddPrice(value);
      }
    };
    const handleSendPrice = (e) => {
      e.preventDefault();  // 기본 폼 제출 동작 방지

      if (addPrice) {
        sendPrice(stompClient, id, addPrice);  // sendPrice 호출하여 가격 전송
        alert(`${addPrice}원 입찰`)
      } else {
        console.error("가격을 입력하세요.");
      }
    };
      

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
              <PointInput 
              placeholder='현재 가격이상으로 입력해주세요'
              name="addPrice" 
              value={addPrice} 
              onChange={handlePriceChange}/>
              <Sspan> {`호가단위는 ${bidprice}원 입니다`}</Sspan>  {/*이거 호가 프롭스로넣기수정필요 */}
              <Sdiv>
              <CurrentPoint>현재 보유량 {myPoint.toLocaleString()}</CurrentPoint>
              </Sdiv>
            

            </ContentDiv>
            <ButtonDiv>
            <Button1 onClick={setModalAdd}>포인트 충전하기</Button1>
            <Button2 onClick={handleSendPrice}
             disabled={Number(addPrice) < Number(currentPrice+bidprice) || myPoint < Number(addPrice)}
            >입찰하기</Button2>
              
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
  background-color: #08AC72;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color:#45a049;
  }



`
const Button2=styled.button`
  width: 48%;
  height: 53px;
  background-color: #08AC72;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color: #45a049;
  }

 &:disabled {
    background-color: rgb(122, 122, 122);;
    cursor: not-allowed;
  }

  &:disabled:hover {
    background-color: rgb(122, 122, 122);; /* hover 시에도 회색 유지 */
  }
`;