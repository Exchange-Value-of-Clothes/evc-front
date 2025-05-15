import React,{useState}from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import defaultImg from '../asset/image/defaultImg.png'
import { useNavigate } from 'react-router-dom';
import useFetchUser from '../hook/useFetchUser';
import { editEmail,editPassword } from '../api/userApi';

const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;

function PasswordPage() { 
    const navigate =useNavigate();
    const { userInfo, fetchUser } = useFetchUser();
    const [email,setEmail] =useState('');
    const [passwordInfo,setPasswordInfo] = useState({
        oldPassword : "",
        newPassword : "",
        checkPassword : "",
    });

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
      };
  

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        try{
            await editEmail(email);
            alert("이메일이 변경완료되었습니다.");
            navigate("/mypage")

        }catch(err){
            console.log(err);
            alert("이메일 형식에맞게 변경해주세요");
            return;
        }
        
    }
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        try{
            await editPassword(passwordInfo);
            alert("비밀번호 변경완료되었습니다.");
            navigate("/mypage")
            //로그아웃 시키는 로직 추가

        }catch(err){
            console.log(err);
            alert("8자리 이상의 비밀번호를 입력하세요");
            return;
        }
        
    }
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordInfo((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

  return (
    <CommonBox >
        <PageStyle>
            <Header2 title={"비밀번호 변경"} icon={<BackIcon/>}></Header2>      
            <AppMain>   
                <ProfileDiv>
                <ProfileImgDiv>
                    <ProfileImgbox>
                        <ProfileImg src={`${IMG_URL}/${userInfo.imageName}`||defaultImg}/>
                    </ProfileImgbox>
                  
                </ProfileImgDiv>
                </ProfileDiv>

                <SettingDiv>
                    <EmailChangeDiv>
                        <EmailInput
                            placeholder='변경할 이메일 입력'
                            value={email}
                            onChange={handleEmailChange} 
                        />

            
                        <EmailChange onClick={handleEmailSubmit}>
                            이메일 변경
                        </EmailChange>
                    </EmailChangeDiv>
                    <PasswordChangeDiv>
                        <PasswordInput  
                        name='oldPassword'
                        placeholder="현재 비밀번호를 입력해주세요."
                        value={passwordInfo.oldPassword}
                        onChange={handlePasswordChange}
                        />

                        <PasswordCheckButton>
                            확인
                        </PasswordCheckButton>
                    </PasswordChangeDiv>
                    <NewPasswordDiv>
                        <NewPasswordInput
                         name='newPassword'
                         placeholder="새로운 비밀번호를 입력해주세요"
                         value={passwordInfo.newPassword}
                         onChange={handlePasswordChange}
                         />
                     
                    </NewPasswordDiv>
                    <PasswordCheckDiv>
                        <PasswordCheckInput
                         name='checkPassword'
                         placeholder="비밀번호를 확인해주세요."
                         value={passwordInfo.checkPassword}
                         onChange={handlePasswordChange}
                         />

                    </PasswordCheckDiv>  
                    <Change onClick={handlePasswordSubmit}>비밀번호 변경</Change> 
                
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
    width: 80px;
    height: 80px;
    border-radius: 100%;

    position: relative;
    @media(max-height:700px) {
        width: 90px;
        height: 90px;
    }
   
`
const ProfileImgbox = styled.div`
    width: 80px;
    height: 80px;
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
    width: 73%;
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

const EmailChangeDiv=styled.div`
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
   
`
const EmailInput=styled.input`
    width: 73%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #444448;
  
    padding: 16px 10px;
    &::placeholder{
      
      
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
   


`



