import React, { useState } from 'react'
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import{ReactComponent as Kakao} from '../asset/svgs/realkakao.svg'
import {ReactComponent as Naver} from '../asset/svgs/realnaver.svg'
import {ReactComponent as Google} from '../asset/svgs/realgoogle.svg'
import { useMutation } from "@tanstack/react-query";
import { logInApi,socialLogin } from "../api/authApi";
import axios from 'axios';
import userStore from '../store/userStore'

function SignIn() {
  const navigate=useNavigate();
  const {setAccessToken}=userStore();
    const [error, setError] = useState("");
        const [formData, setFormData] = useState({
          email: '',
          password: '',
        });

        const loginMutation = useMutation({
          mutationFn: logInApi,
          onSuccess: (data) => {
            
            console.log("로그인 성공:", data);
            alert("로그인 성공!");
            localStorage.setItem('LoginState',true);
            const { accessToken } = data
            console.log(accessToken)
            setAccessToken(data);
            axios.defaults.headers.common['Authorization']=`Bearer ${accessToken}`;
            navigate('/home');
            
          },
          onError: (error) => {
            console.error("로그인 실패:", error);
            alert("로그인 실패!");
            if(error.message==='이메일 혹은 비밀번호가 다릅니다.'){
              setError("이메일 혹은 비밀번호가 다릅니다.");
            }
          },
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          
          setError("")
          console.log('Submitted:', formData);
          loginMutation.mutate(formData);
        };
    
      
  return (
    <>
      <PageStyle>
        <LoginContainer>
            <LoginForm>
              <Link to={'/home'} style={{ textDecoration: "none",color:'white'}}>
                <LogoDiv> 의가교환 </LogoDiv>
              </Link>
                <span style={{fontSize:'14px',fontFamily:'NeoM,sans-serif'}}>반가워요! 로그인을 위해 이메일과 비밀번호를 입력해주세요</span>
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
                        {error && <Errormsg style={{ color: "red" }}>{error}</Errormsg>}

                        <LoginButton  type="submit" onClick={handleSubmit}>
                          로그인하기  
                        
                        </LoginButton>
                     
                </InputGroup>
                <span style={{fontSize:'14px',fontFamily:'NeoM,sans-serif'} }>소셜로 로그인하기</span>
                <SocialDiv>


                  
                    <SignInKakao

                      />
                  
                  
                    {/*<a href='http://ec2-15-164-152-88.ap-northeast-2.compute.amazonaws.com:8080/api/auth/social?provider_type=NAVER&state=cmakc2199r21ll1z'>*/}
                    <SignInNaver
         

                       />

                   
                 
                    <SignInGoogle
                      onClick={()=>socialLogin("GOOGLE")}

                    />
                      
                </SocialDiv>
                <Link to={'/signup'} style={{ textDecoration: "none",color:'white'}}>
                <span style={{fontSize:'14px',fontFamily:'NeoM,sans-serif'}} >계정이 없으신가요? 회원가입 하러가기</span>  
                </Link> 
            </LoginForm>
        </LoginContainer>
      </PageStyle>
   
  </>
  )
}

export default SignIn

const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;  /* 최소 높이만 100dvh로 설정 */
  max-width: 480px;
  margin: 0 auto;
  background-color: #1C1C1E;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`;
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 100%;
`
const LoginForm = styled.div`
  margin: 10px;
  background-color: #2C2C2E;
  width: 100%; 
  height: auto;
  max-width: 480px;
  max-height: 550px;
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
  font-family: 'NeoH',sans-serif;

`
const InputGroup =styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 0 16px;

`
const EmailInput = styled.input`
  width: 100%;
  background-color: #212025;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px ;
  height: 53px;


  &::placeholder{
    font-size: 14px;
    color: #F4F4F4;
    font-family: 'NeoM',sans-serif;
  }

`
const PwForm =styled.input`
  width: 100%;
  background-color: #212025;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px;
  height: 53px;


  &::placeholder{
    font-family: 'NeoM',sans-serif;

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
  height: 53px;
  font-size: 16px;

`
const SocialDiv =styled.div`
  width: 90%;
  height: 55px;
  display: flex;
  justify-content: space-between;

`
const SignInKakao=styled(Kakao)`
 
  border-radius: 8px;
  width: 30%;
  height: 100%;
  background-color:#FEE500;


`
const SignInNaver=styled(Naver)`

  border-radius: 8px;
  width: 30%;
  height: 100%;
  background-color:#00C73C;


`
const SignInGoogle=styled(Google)`

  border-radius: 8px;
  width: 30%;
  height: 100%;
  background-color:white;
`

const Errormsg=styled.p`
  font-family: 'NeoM',sans-serif;
  color: #FF453A;
  font-size: 14px;
  height: 14px;
  margin: 0;
  display: flex;
  align-self: start;
  padding-left: 7px;
`