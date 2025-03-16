import React,{useState}from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import eximg from '../asset/image/샌즈.jpg'
import {ReactComponent as ProfileAdd} from "../asset/svgs/ProfileAdd.svg"
import { Link } from 'react-router-dom';
 
function PasswordPage() { 
    
  return (
    <CommonBox >
        <PageStyle>
            <Header2 title={"비밀번호 변경"} icon={<BackIcon/>}></Header2>      
            <AppMain>   
                <ProfileDiv>
                <ProfileImgDiv>
                    <ProfileImgbox>
                        <ProfileImg src={eximg}/>
                    </ProfileImgbox>
                  
                </ProfileImgDiv>
                </ProfileDiv>

                <SettingDiv>
                    <PasswordChangeDiv>
                        <PasswordInput  
                        placeholder="현재 비밀번호를 입력해주세요."/>

                        <PasswordCheckButton>
                            확인
                        </PasswordCheckButton>
                    </PasswordChangeDiv>
                    <NewPasswordDiv>
                        <NewPasswordInput
                         placeholder="새로운 비밀번호를 입력해주세요"/>
                     
                    </NewPasswordDiv>
                    <PasswordCheckDiv>
                        <PasswordCheckInput
                         placeholder="비밀번호를 확인해주세요."/>

                    </PasswordCheckDiv>  
                    <Change>변경</Change> 
                
                </SettingDiv>
                                          
            </AppMain>
            <Footer/>
        </PageStyle>
    </CommonBox>
  )
}

export default PasswordPage

const PageStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
  flex-direction: column;
`
const AppMain=styled.div`
  flex:1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  gap:1px;

`
const ProfileDiv=styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ProfileImgDiv=styled.div`
    width: 120px;
    height: 120px;
    border-radius: 100%;

    position: relative;
    @media(max-height:700px) {
        width: 90px;
        height: 90px;
    }
   
`
const ProfileImgbox = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 100%;
    overflow: hidden;
    @media(max-height:700px) {
        width: 90px;
        height: 90px;
    }
`
const ProfileImg=styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const SettingDiv=styled.div`
    width: 100%;
    height: 70%;
    padding: 5px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap:10px;

`
const PasswordChangeDiv=styled.div`
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`
const NewPasswordDiv=styled.div`
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
   
`
const PasswordCheckDiv=styled.div`
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`
const PasswordInput=styled.input`
    width: 70%;
    height: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    background-color: #444448;
    &::placeholder{
        color: #F4F4F4;
    }
    padding: 16px 10px;

`
const PasswordCheckButton=styled.button`
    width: 25%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2C2C2E;
`
const NewPasswordInput=styled.input`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #444448;
    &::placeholder{
        color: #F4F4F4;
    }
    padding: 16px 10px;

`

const PasswordCheckInput=styled.input`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #444448;
    &::placeholder{
        color: #F4F4F4;
    }
    padding: 16px 10px;

`

const Change=styled.button`
    width: 100%;
    height: 55px;

    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2C2C2E;
`



