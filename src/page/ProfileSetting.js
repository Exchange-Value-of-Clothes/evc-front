import React from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import eximg from '../asset/image/샌즈.jpg'
import {ReactComponent as ProfileAdd} from "../asset/svgs/ProfileAdd.svg"
import { Link } from 'react-router-dom';
 
function ProfileSetting() { 
    
  return (
    <CommonBox >
        <PageStyle>
            <Header2 title={"프로필 수정"} icon={<BackIcon/>}></Header2>      
            <AppMain>   
                <ProfileDiv>
                <ProfileImgDiv>
                    <ProfileImgbox>
                        <ProfileImg src={eximg}/>
                    </ProfileImgbox>
                    <AddIcon/>
                </ProfileImgDiv>
                </ProfileDiv>

                <SettingDiv>
                    <NameChangeDiv>
                        <NameInput
                            placeholder='닉네임'
                        />

                    
                        <NameChange>
                            닉네임 변경
                        </NameChange>
                    </NameChangeDiv>
                    <EmailChangeDiv>
                        <EmailInput
                              placeholder='이메일@gmail.com'
                        />

            
                        <EmailChange>
                            이메일 변경
                        </EmailChange>
                    </EmailChangeDiv>
                    <PasswordSetDiv>
                     
                        <PasswordChange>
                            <Link to={"/passwordpage"} style={{textDecoration:'none'}}>
                            비밀번호 변경
                            </Link>
                        </PasswordChange>   
                    </PasswordSetDiv>   
                
                </SettingDiv>
                                          
            </AppMain>
            <Footer/>
        </PageStyle>
    </CommonBox>
  )
}

export default ProfileSetting

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
const AddIcon=styled(ProfileAdd)`
    position: absolute;
    bottom: 0;
    right: 0;
   
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
const NameChangeDiv=styled.div`
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`
const EmailChangeDiv=styled.div`
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
   
`
const PasswordSetDiv=styled.div`
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`
const NameInput=styled.input`
    width: 73%;
    height: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    background-color: #444448;
    font-family: 'NeoSB',sans-serif;
    font-size: 16px;
    padding: 16px 10px;
    &::placeholder{
        font-size: 16px;
        font-family: 'NeoSB',sans-serif;
        color:#F4F4F4;
    }

`
const NameChange=styled.button`
    width: 25%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2C2C2E;
    font-family: 'NeoSB',sans-serif;
    font-size: 13px;
`
const EmailInput=styled.input`
    width: 73%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #444448;
    font-family: 'NeoSB',sans-serif;
    font-size: 16px;
    padding: 16px 10px;
    &::placeholder{
        font-size: 16px;
        font-family: 'NeoSB',sans-serif;
        color:#F4F4F4;
    }

`
const EmailChange=styled.button`
    width: 25%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2C2C2E;
    font-family: 'NeoSB',sans-serif;
    font-size: 13px;


`

const PasswordChange=styled.button`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2C2C2E;
    font-family: 'NeoSB',sans-serif;
    font-size: 13px;

`



