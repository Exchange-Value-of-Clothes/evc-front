import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {ReactComponent as Kakao} from '../asset/svgs/realkakao.svg'
import {ReactComponent as Naver} from '../asset/svgs/realnaver.svg'
import {ReactComponent as Google} from '../asset/svgs/realgoogle.svg'

function SignIn() {
        const [formData, setFormData] = useState({
          username: '',
          password: '',
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log('Submitted:', formData);
          // 로그인 처리 로직 추가 (ex. API 요청)
        };
    
      
  return (
    <>
      <PageStyle>
        <LoginContainer>
            <LoginForm>
                <LogoDiv> 의가교환 </LogoDiv>
                <span style={{fontSize:'15px'}}>반가워요! 로그인을 위해 이메일과 비밀번호를 입력해주세요</span>
                <InputGroup onClick={handleSubmit} >
                   
                        <EmailInput
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
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
                    
                        <LoginButton type="submit">
                          <Link to={'/main'} style={{ textDecoration: "none",color:'white'}}>
                          로그인하기  
                          </Link> 
                        </LoginButton>
                     
                </InputGroup>
                <span >소셜로 로그인하기</span>
                <SocialDiv>
                    <KakaoDiv>
                        <Kakao />


                    </KakaoDiv>
                    <NaverDiv>
                        <Naver style={{Color:'#00C73C'}}/>
                     

                    </NaverDiv>
                    <GoogleDiv>
                        <Google/>
                

                    </GoogleDiv>
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
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #ddd; 
  background-color: #1C1C1E;
  display: flex;
  justify-content: center;
  align-items: center;

`
const LoginContainer = styled.div`
  display: flex;
`
const LoginForm = styled.div`
  margin: 10px;
  background-color: #2C2C2E;
  width: 100%; 
  min-width: 200px;
  max-width: 400px;
  height: 100%;
  min-height: 500px;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LogoDiv = styled.div`
  width: 45%;
  height: 20%;
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
  

`
const EmailInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: #212025;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px;
  font-size: large;   

  &::placeholder{
    font-size: 14px;
    color: #F4F4F4;

  }

`
const PwForm =styled.input`
  width: 100%;
  height: 100%;
  background-color: #212025;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  font-size: large;

  &::placeholder{
    font-size: 14px;
    color: #F4F4F4;
  }

`
const LoginButton =styled.button`
  width: 100%;
  height: 100%;
  background-color: #08AC72;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  font-size: large;
 

`
const SocialDiv =styled.div`
  width: 100%;
  height: 11%;
  display: flex;
  justify-content: space-around;

`
const KakaoDiv =styled.div`
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

`
const NaverDiv =styled.div`

  border-radius: 8px;
 
  display: flex;
  justify-content: center;
  align-items: center;

`
const GoogleDiv=styled.div`
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;


`