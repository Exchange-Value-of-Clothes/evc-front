import React,{useState} from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import{ReactComponent as Kakao} from '../asset/svgs/realkakao.svg'
import {ReactComponent as Naver} from '../asset/svgs/realnaver.svg'
import {ReactComponent as Google} from '../asset/svgs/realgoogle.svg'
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/authApi";

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  });
  // const [isSpecialState, setIsSpecialState] = useState(false); //미완성코드


  const mutation = useMutation({
    mutationFn:registerApi,
    onSuccess: (data) => {
      console.log("회원가입 성공:", data);
      alert("회원가입 성공!");
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패!");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.checkPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('Submitted:', formData);
    mutation.mutate(formData);
  };


return (
  <>
    <PageStyle>
      <SignupContainer>
          <SignupForm>
              <SignupLogoDiv> 의가교환 </SignupLogoDiv>
              <span style={{fontSize:'15px'}}>반가워요! 회원가입을 위해 정보를 입력해주세요.</span>
              <SignupInputGroup>
                      <SignupEmailDiv>
                        <SignupEmailInput
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="이메일을 입력해주세요."
                        />
                        <DuplicateCheck>
                          중복확인
                        </DuplicateCheck>
          
                      </SignupEmailDiv>
                      {/* {isSpecialState && (
                          
                          <VerifyInput type="text" placeholder="이메일 인증" />
                      
                        )}   */}

          
                      <SignupNameInput
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                      required
                      placeholder="닉네임을 입력해주세요."
                      />
                
                      <SignupPwInput
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="비밀번호를 입력해주세요."
                      />
                  
                
                      <SignupPwCheck
                      type="password"
                      name="checkPassword"
                      value={formData.checkPassword}
                      onChange={handleChange}
                      required
                      placeholder="비밀번호를 확인해주세요"
                      />
                  
                  <SignupButton type="submit" onClick={handleSubmit}>
                      회원가입하기
                  </SignupButton>
              </SignupInputGroup>
              <span >소셜로 회원가입하기</span>
              <SignupSocialDiv>
                  <Signupkakao/> 
                    
                  <Signupnaver/> 

                  <Signupgoogle/> 
              </SignupSocialDiv>
              <Link to={'/login'} style={{ textDecoration: "none",color:'white'}}>
                  <span >이미 계정이 있으신가요? 로그인 하러가기</span>  
              </Link> 
          </SignupForm>
      </SignupContainer>
    </PageStyle>
  </>
  )
}

export default SignUp

const PageStyle = styled.div`
  flex-direction: column;
  height: 100dvh;
  max-width: 480px;
  margin: 0 auto;
  background-color: #1C1C1E;
  display: flex;
  justify-content: center;
  align-items: center;

`
const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

`
const SignupForm =styled.div`
  margin: 10px;
  background-color: #2C2C2E;
  width: 100%;
  max-width: 480px;
  height: 90%;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  gap:16px;
  flex-direction: column;
  align-items: center;

`
const SignupLogoDiv=styled.div`
  width: 140px;
  height: 100px;
  background-color:#212025;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

`
const SignupInputGroup=styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3%;
  margin: 10px;
`
const SignupEmailDiv=styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap:5px;
  height: 20%;
  
`
const SignupEmailInput=styled.input`
  width: 100%;
  height: 100%;
  background-color: #212025;
  box-sizing: border-box;

  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  &::placeholder{
   
    color: #F4F4F4;
  }

`
const VerifyInput=styled.input`
  width: 100%;
  height: 100%;
  background-color: #212025;
  box-sizing: border-box;

  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  &::placeholder{
   
   color: #F4F4F4;
 }

`

const DuplicateCheck=styled.button`
  background-color: #444448;
  border-radius: 8px;
  width: 35%;
  height: 100%;
  border: none;
  

`
const SignupNameInput=styled.input`
  width: 100%;
  height: 20%;
  background-color: #212025;
  box-sizing: border-box;

  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;

  &::placeholder{
  
    color: #F4F4F4;
  }

`
const SignupPwInput=styled.input`
  width: 100%;
  height: 20%;
  background-color: #212025;
  box-sizing: border-box;

  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
 
  &::placeholder{
 
    color: #F4F4F4;
  }

`
const SignupPwCheck=styled.input`
  width: 100%;
  height: 20%;
  background-color: #212025;
  box-sizing: border-box;

  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;

  &::placeholder{

    color: #F4F4F4;
  }
`
const SignupButton=styled.button`
  width: 100%;
  height: 20%;
  background-color: #08AC72;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 15px 10px 15px 10px;
  font-size: 90%;


`
const SignupSocialDiv=styled.div`
  width: 90%;
  height: 11%;
  
  display: flex;
  justify-content: space-between;

`
const Signupkakao=styled(Kakao)`
 
  border-radius: 8px;
  width: 30%;
  height: 100%;


`
const Signupnaver=styled(Naver)`

  border-radius: 8px;
  width: 30%;
  height: 100%;


`
const Signupgoogle=styled(Google)`

  border-radius: 8px;
  width: 30%;
  height: 100%;

`