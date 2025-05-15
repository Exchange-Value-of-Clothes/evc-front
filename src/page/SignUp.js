import React,{useState} from 'react'
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import {ReactComponent as Kakao} from '../asset/svgs/realkakao.svg'
import {ReactComponent as Naver} from '../asset/svgs/realnaver.svg'
import {ReactComponent as Google} from '../asset/svgs/realgoogle.svg'
import { useMutation,useQuery} from "@tanstack/react-query";
import { registerApi } from "../api/authApi";
import { RequestCodeApi } from "../api/authApi";

function SignUp() {
  //const navigate=useNavigate();
  const [error, setError] = useState({
    email:"",
    nickname:"",
    password:"",
    checkPassword:""
  });
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    checkPassword: ""
  });

  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
  const mutation = useMutation({
    mutationFn:registerApi,
    onSuccess: (data) => {
      alert("인증메일을 확인후 로그인해주세요!");
      //navigate('/login');
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패!");
      if(error.message==="Request failed with status code 409"){
        setError((prevError) => ({
          ...prevError,
          email: "이미 존재하는 이메일입니다.",
        }));
      }
    }, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError((prevError) => ({
      ...prevError,
      [name]: "" 
    }));
    
  };

  const handleRequest=async (e)=>{
    e.preventDefault();

    if(formData.email.trim()===''){
      alert("회원가입 절차를 마친 뒤 메일이 안왔을때 사용해주세요.");
      return
    }else if(!emailFormat.test(formData.email)){
      alert("이메일형식을 사용하고 회원가입 절차를 마친 뒤 메일이 안왔을때 사용해주세요.");
      return
    }else{ 
      try{
        await RequestCodeApi(formData.email);
        alert("인증코드가 메일로 재발송 되었습니다.");
      } catch (err) {
        alert('인증 코드 재요청 실패');
        console.error(err);
      }
  }
}

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { email: "", nickname: "", password: "", checkPassword: "" };
    let hasError = false;

    if (formData.email.trim()===""){
      newErrors.email="이메일 입력은 필수입니다.";
      hasError=true;
    }
    if (formData.nickname.trim()===""){
      newErrors.nickname="닉네임 입력은 필수입니다.";
      hasError=true;
    }else if(formData.nickname.length<2){
      newErrors.nickname="두글자 이상 입력해주세요.";
      hasError=true;
    }
    if (formData.password.trim()===""){
      newErrors.password="비밀번호 입력은 필수입니다.";
      hasError=true;
    }else if(formData.password.length<8){
      newErrors.password="최소 8자 이상 입력해주세요.";
      hasError=true;
    }
    
    if (formData.password !== formData.checkPassword||formData.checkPassword.trim()==="") {
      newErrors.checkPassword='현재 비밀번호와 일치하지 않습니다.';
      hasError = true;
    }
    if(hasError){
      setError(newErrors);
      return
    }
   
    setError({ email: "", nickname: "", password: "", checkPassword: "" });
    mutation.mutate(formData);
  };


return (
  <>
    <PageStyle>
      <SignupContainer>
          <SignupForm onSubmit={(e) => e.preventDefault()} >
              <SignupLogoDiv> 의가교환 </SignupLogoDiv>
              <span style={{fontSize:'14px',fontFamily:'NeoM,sans-serif'}}>반가워요! 회원가입을 위해 정보를 입력해주세요.</span>
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
                    
                        <DuplicateCheck onClick={handleRequest}>
                          재인증
                        </DuplicateCheck>
            
                        
                      </SignupEmailDiv>
                      {error.email && <Errormsg>{error.email}</Errormsg>}


          
                      <SignupNameInput
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                      required
                      placeholder="닉네임을 입력해주세요."
                     
                      />
                         {error.nickname && <Errormsg>{error.nickname}</Errormsg>}

                      <SignupPwInput
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="비밀번호를 입력해주세요."
                
                      />
                        {error.password && <Errormsg>{error.password}</Errormsg>}

                
                      <SignupPwCheck
                      type="password"
                      name="checkPassword"
                      value={formData.checkPassword}
                      onChange={handleChange}
                      required
                      placeholder="비밀번호를 확인해주세요"
                
                      />
                        {error.checkPassword && <Errormsg>{error.checkPassword}</Errormsg>}

                  <SignupButton type="submit" onClick={handleSubmit}>
                      회원가입하기
                  </SignupButton>
              </SignupInputGroup>
              <span style={{fontSize:'14px',fontFamily:'NeoM,sans-serif'}} >소셜로 로그인하기</span>
              <SignupSocialDiv>
                  <a href='http://ec2-15-164-152-88.ap-northeast-2.compute.amazonaws.com:8080/api/auth/social?provider_type=KAKAO&state=cmakc2199r21ll1z'>

                  <Signupkakao/> 
                  </a>
                  <Signupnaver/> 

                  <Signupgoogle/> 
              </SignupSocialDiv>
              <Link to={'/login'} style={{ textDecoration: "none",color:'white'}}>
                  <span style={{fontSize:'14px',fontFamily:'NeoM,sans-serif'}} >이미 계정이 있으신가요? 로그인 하러가기</span>  
              </Link> 
          </SignupForm>
      </SignupContainer>
    </PageStyle>
  </>
  )
}

export default SignUp;

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

const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

const SignupForm =styled.div`
  margin: 10px;
  background-color: #2C2C2E;
  width: 100%;
  max-width: 480px;
  height: auto;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  gap:16px;
  flex-direction: column;
  align-items: center;

`
const SignupLogoDiv=styled.div`
  width: 140px;
  min-height: 100px;
  background-color:#212025;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'NeoH',sans-serif;
`
const SignupInputGroup=styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 16px 0px 16px;
  gap: 16px;
 
`
const SignupEmailDiv=styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap:5px;
  height: 53px;
  
`
const SignupEmailInput=styled.input`
  width: 100%;
  height: 100%;
  background-color: #212025;
  box-sizing: border-box;

  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  @media (max-height: 700px) {
    padding: 10px 6px 10px 6px;
  }
  &::placeholder{
    color: #F4F4F4;
    font-size: 14px;
    font-family: 'NeoM',sans-serif;
  }

`

const DuplicateCheck=styled.button`
  background-color: #444448;
  border-radius: 8px;
  width: 35%;
  height: 100%;
  border: none;
  font-size: 14px;
  font-family: 'NeoM',sans-serif;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color:rgb(43, 43, 44);
  }

`
const SignupNameInput=styled.input`
  width: 100%;
  height: 53px;
  background-color: #212025;
  box-sizing: border-box;

  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  @media (max-height: 700px) {
    padding: 10px 6px 10px 6px;
  }

  &::placeholder{
    font-size: 14px;
    font-family: 'NeoM',sans-serif;

    color: #F4F4F4;
  }

`
const SignupPwInput=styled.input`
  width: 100%;
  height: 53px;
  background-color: #212025;
  box-sizing: border-box;

  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  @media (max-height: 700px) {
    padding: 10px 6px 10px 6px;
  }
 
  &::placeholder{
    font-size: 14px;
    font-family: 'NeoM',sans-serif;

    color: #F4F4F4;
  }

`
const SignupPwCheck=styled.input`
  width: 100%;
  height: 53px;
  background-color: #212025;
  box-sizing: border-box;

  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  @media (max-height: 700px) {
    padding: 10px 6px 10px 6px;
  }

  &::placeholder{
    font-size: 14px;
    font-family: 'NeoM',sans-serif;

    color: #F4F4F4;
  }
`
const SignupButton=styled.button`
  width: 100%;
  height: 53px;
  background-color: #08AC72;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  padding: 16px 10px 16px 10px;
  font-size: 16px;
  @media (max-height: 700px) {
    padding: 10px 6px 10px 6px;
  }
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color: #45a049;
  }

`
const SignupSocialDiv=styled.div`
  width: 90%;
  height: 55px;
  
  display: flex;
  justify-content: space-between;

`
const Signupkakao=styled(Kakao)`
 
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background-color:#FEE500;

`
const Signupnaver=styled(Naver)`

  border-radius: 8px;
  width: 30%;
  height: 100%;
  background-color:#00C73C;

`
const Signupgoogle=styled(Google)`

  border-radius: 8px;
  width: 30%;
  height: 100%;
  background-color: white;
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