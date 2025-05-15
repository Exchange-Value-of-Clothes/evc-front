import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import {deleteDatabase} from '../util/imageTemp'


const TempModal = ({ isOpen, close,loadTempData }) => {

    
  const deleteNClose = () => {
    deleteDatabase();
    close();
  };

  

    return (
      <StyleModal isOpen={isOpen} onRequestClose={close}  appElement={document.getElementById('root')}>
        <ModalContents>
        임시저장한 게시글을 불러오시겠습니까?
        <Buttons>
            <CancleButton onClick={deleteNClose}>
                취소
            </CancleButton>
            <LoadButton onClick={() => {
                loadTempData();  // loadTempData 함수 호출
                close();  // 모달 닫기
            }}>
                불러오기
            </LoadButton>
        </Buttons>
          
        </ModalContents>
      </StyleModal>
    );
  };
  
  export default TempModal;

const StyleModal=styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
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
  align-items: center;
  gap: 16px;

`
const Buttons =styled.div`
display: flex;
width: 100%;
gap: 16px;
justify-content: space-between;
`
const CancleButton =styled.button`
    width: 151px;
    height: 53px;
    border: none;
    border-radius:8px ;
    font-size: 16px;
    background-color: #757575;
    cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color:rgb(53, 53, 53);
  }
`
const LoadButton =styled.button`
    width: 151px;
    height: 53px;
    border: none;
    border-radius:8px ;
    font-size: 16px;
    background-color: #08AC72;
    cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color: #45a049;
  }

`
