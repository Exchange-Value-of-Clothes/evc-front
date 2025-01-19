import React,{useState} from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import{ReactComponent as Kakao} from '../asset/svgs/realkakao.svg'
import {ReactComponent as Naver} from '../asset/svgs/realnaver.svg'
import {ReactComponent as Google} from '../asset/svgs/realgoogle.svg'

function SignUp() {
  const [formData, setFormData] = useState({
    useremail: '',
    username: '',
    password: '',
    pwcheck: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(null);
  /*const handleDuplicateCheck =(e)=>{}*/ 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.pwcheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('Submitted:', formData);
    // 로그인 처리 로직 추가 (ex. API 요청)
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
                        name="useremail"
                        value={formData.useremail}
                        onChange={handleChange}
                        required
                        placeholder="이메일을 입력해주세요."
                        />
                        <DuplicateCheck>
                          중복확인
                        </DuplicateCheck>

                      </SignupEmailDiv>
          
                      <SignupNameInput
                      type="text"
                      name="username"
                      value={formData.username}
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
                      name="pwcheck"
                      value={formData.pwcheck}
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
                  <Signupkakao> <Kakao/> </Signupkakao>
                    
                  <Signupnaver> <Naver/> </Signupnaver>

                  <Signupgoogle> <Google/></Signupgoogle>
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
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #ddd; 
  background-color: #1C1C1E;
  display: flex;
  justify-content: center;
  align-items: center;

`
const SignupContainer = styled.div`
  display: flex;
  min-width: 100%;

`
const SignupForm =styled.div`
  margin: 10px;
  background-color: #2C2C2E;
  width: 100%;
  max-width: 480px;
  height: 100%;
  min-height: 600px;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

`
const SignupLogoDiv=styled.div`
  width: 45%;
  height: 35%;
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
  gap: 16px;

`
const SignupEmailDiv=styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap:5px;

`
const SignupEmailInput=styled.input`
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
const DuplicateCheck=styled.button`
  background-color: #444448;
  border-radius: 8px;
  width: 35%;
  height: 100%;
  border: none;


`
const SignupNameInput=styled.input`
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
const SignupPwInput=styled.input`
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
const SignupPwCheck=styled.input`
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
const SignupButton=styled.button`
  width: 100%;
  height: 100%;
  background-color: #08AC72;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  font-size: large;


`
const SignupSocialDiv=styled.div`
  width: 90%;
  height: 20%;
  
  display: flex;
  justify-content: space-between;

`
const Signupkakao=styled.div`
 
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

`
const Signupnaver=styled.div`

  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

`
const Signupgoogle=styled.div`

  border-radius: 8px;
;
  display: flex;
  justify-content: center;
  align-items: center;

`