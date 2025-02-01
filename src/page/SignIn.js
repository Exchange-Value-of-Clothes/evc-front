import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {ReactComponent as Kakao} from '../asset/svgs/realkakao.svg'
import {ReactComponent as Naver} from '../asset/svgs/realnaver.svg'
import {ReactComponent as Google} from '../asset/svgs/realgoogle.svg'
import { useMutation } from "@tanstack/react-query";
import { logInApi } from "../api/authApi";

function SignIn() {
        const [formData, setFormData] = useState({
          email: '',
          password: '',
        });

        const mutation = useMutation({
          mutationFn: logInApi,
          onSuccess: (data) => {
            console.log("로그인 성공:", data);
            localStorage.setItem('authenticationToken',JSON.stringify(data.authenticationToken))
            alert("로그인 성공!");
          },
          onError: (error) => {
            console.error("로그인 실패:", error);
            alert("로그인 실패!");
          },
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log('Submitted:', formData);
          mutation.mutate(formData);
        };
    
      
  return (
    <>
      <PageStyle>
        <LoginContainer>
            <LoginForm>
                <LogoDiv> 의가교환 </LogoDiv>
                <span style={{fontSize:'15px'}}>반가워요! 로그인을 위해 이메일과 비밀번호를 입력해주세요</span>
                <InputGroup>
                   
                        <EmailInput
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="이메일을 입력해주세요."
                        />
                    
                  
                        <PwForm
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="비밀번호를 입력해주세요."
                        />
                    
                        <LoginButton  type="submit" onClick={handleSubmit}>
                          로그인하기  
                        
                        </LoginButton>
                     
                </InputGroup>
                <span >소셜로 로그인하기</span>
                <SocialDiv>
                    <SignInKakao/>

                    <SignInNaver/>

                    <SignInGoogle/>
                      
                </SocialDiv>
                <Link to={'/signup'} style={{ textDecoration: "none",color:'white'}}>
                <span >계정이 없으신가요? 회원가입 하러가기</span>  
                </Link> 
            </LoginForm>
        </LoginContainer>
      </PageStyle>
   
  </>
  )
}

export default SignIn

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
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

`
const LoginForm = styled.div`
  margin: 10px;
  background-color: #2C2C2E;
  width: 100%; 
  height: 90%;
  max-width: 480px;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LogoDiv = styled.div`
  width: 140px;
  height: 100px;
  background-color:#212025;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

`
const InputGroup =styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 10px;

`
const EmailInput = styled.input`
  width: 100%;
  background-color: #212025;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px ;
   

  &::placeholder{
    font-size: 14px;
    color: #F4F4F4;

  }

`
const PwForm =styled.input`
  width: 100%;
  background-color: #212025;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px;
 

  &::placeholder{
    font-size: 14px;
    color: #F4F4F4;
  }

`
const LoginButton =styled.button`
  width: 100%;
  background-color: #08AC72;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px;

`
const SocialDiv =styled.div`
  width: 90%;
  height: 11%;
  display: flex;
  justify-content: space-between;

`
const SignInKakao=styled(Kakao)`
 
  border-radius: 8px;
  width: 30%;
  height: 100%;


`
const SignInNaver=styled(Naver)`

  border-radius: 8px;
  width: 30%;
  height: 100%;


`
const SignInGoogle=styled(Google)`

  border-radius: 8px;
  width: 30%;
  height: 100%;


`