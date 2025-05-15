import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import {ReactComponent as BackArrow} from "../asset/svgs/Back.svg"
import {ReactComponent as EvcbigLogo} from '../asset/svgs/Evc_bigLogo.svg'
import {makePost} from '../api/chatApi'
import { getAccount } from '../api/userApi';

const ParcelModal=({isOpen,close,postData})=> {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    accountName: '',
    accountNumber: '',
    phoneNumber: '',
    basicAddress: '',
    detailAddress: '',
  });

  const handlePostClick = async () => {
    try {
      await makePost(postData);
      
      close(false);
      alert('배송주문이 생성되었습니다')
    } catch (error) {
      console.error('배송 요청 실패:', error);
      alert('상대와 본인의 개인정보가 모두 작성되었는지 확인하세요')
    }
  }
  const gotoInfoSet = async () => {
    navigate('/InfoSet')
  }
  const handleClick = () => {
    if (isLabelIncomplete) {
      gotoInfoSet();
      
    } else {
      handlePostClick();
    }
  };

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await getAccount();
        

        setUserInfo({
          accountName: response.accountName || '',
          accountNumber: response.accountNumber || '',
          phoneNumber: response.phoneNumber || '',
          basicAddress: response.basicAddress || '',
          detailAddress: response.detailAddress || '',
        });
      } catch (error) {
        console.error('계정 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchAccountInfo();
  }, []);
  const isLabelIncomplete = Object.values(userInfo).some(value => value === '');

  return (
      <StyleModal
        isOpen={isOpen}
      
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 1000, // 반드시 높게
          },
          content: {
            zIndex: 1001,
          },
        }}
      >
        <ModalContents>
          <ModalHeader>
            <BackArrow onClick={close} />
            택배정보
          </ModalHeader>
          <ContentDiv>
            <BuyerDiv>
              <SIcon />
              {isLabelIncomplete ? (
                <Rdiv2>
                  아직 라벨 작성을 하지 않았어요!<br/>
                  라벨 작성을 완전하게 진행해주세요.
                </Rdiv2>
              ) : (
                <>
                <>
                  <Rdiv>입금자명</Rdiv>
                  <Tdiv>{userInfo.accountName}</Tdiv>
                </> 
                <>
                  <Rdiv>계좌번호</Rdiv>
                  <Tdiv>{userInfo.accountNumber}</Tdiv>
                </> 
                <>
                  <Rdiv>전화번호</Rdiv>
                  <Tdiv>{userInfo.phoneNumber}</Tdiv>
                </> 
                <>
                  <Rdiv>주소</Rdiv>
                  <Tdiv>{userInfo.basicAddress}</Tdiv>
                </> 
                <>
                  <Rdiv>상세주소</Rdiv>
                  <Tdiv>{userInfo.detailAddress}</Tdiv>
                </>
                </>
              )}
            </BuyerDiv>
            
          <PostButton onClick={handleClick} >배송하기</PostButton>
          </ContentDiv>
        </ModalContents>
      </StyleModal>
    );
    
}

export default ParcelModal;

const StyleModal=styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:331px;
  max-height: 550px;
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

`
const ModalHeader=styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  gap: 15px;
`


const ContentDiv=styled.div`
  
  width: 100%;
  box-sizing: border-box;
    
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`
const BuyerDiv=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #919191;
    padding-bottom:8px;
    gap: 8px;

`
const SellerDiv=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    

`
const SIcon=styled(EvcbigLogo)`
    width: 35px;
    height: 44px;
`
const Gdiv =styled.div`
    font-size: 16px;
    color:#16FF00 ;
    font-family: 'NeoEB', sans-serif;

`
const Rdiv =styled.div`
    font-size: 12px;
    font-family: 'NeoSB', sans-serif;   
    color: #919191;

`
const Tdiv =styled.div`
    font-size: 16px;
    font-family: 'NeoSB', sans-serif;

`
const Rdiv2 =styled.div`
    font-size: 16px;
    font-family: 'NeoSB', sans-serif;   
    color: #919191;
    text-align: center;
    padding: 8px 32px;

`
const PostButton= styled.button`
  height: 53px;
  background-color: #08AC72;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color: #45a049;
  }

`