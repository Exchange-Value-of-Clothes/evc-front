import React,{useState,useRef,useEffect} from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import {ReactComponent as Cancle} from "../asset/svgs/Cancle.svg"
import Footer from '../component/Footer';
import { useNavigate} from 'react-router-dom';
import {ReactComponent as Down} from "../asset/svgs/Down.svg"
import { searchAddress,postAddress,getAccount,postAccount } from '../api/userApi';


 function InfoSet() {
    const navigate = useNavigate();
    const handleBack=()=>{
        navigate(-1);
    }
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const [results, setResults] = useState([]);
    const [Info,setInfo] = useState({
      accountName : "",
      accountNumber : "",
      phoneNumber : "",
      basicAddress : "",
      detailAddress : "",
      x:'',
      y:''
    })
    
    const fetchAccountInfo = async () => {
      
      try {
        const response = await getAccount(); // 예: axios.get(...) 또는 fetch
        // API 응답 구조에 따라 아래를 조정
       
       
        setInfo({
          accountName: response.accountName || "",
          accountNumber: response.accountNumber || "",
          phoneNumber: response.phoneNumber || "",
          basicAddress: response.basicAddress || "",
          detailAddress: response.detailAddress || "",
        });
      } catch (error) {
        console.error("계정 정보를 불러오는 데 실패했습니다:", error);
      }
    };
    useEffect(()=>{
      fetchAccountInfo();
    },[])
    const handleSubmit = async () => {
      if (!Info.x || !Info.y) {
        alert("주소를 검색을 통해서 선택해 주세요."); // 또는 다른 적절한 메시지
        return;
      }
      try {
          await postAddress(Info); 
          await postAccount(Info);    
          alert('등록이완료되었습니다!')
          navigate('/mypage')
      } catch (err) {
          console.error("주소 등록 실패", err);
      }
  };
    const search = async () => {
      try {
        const response = await searchAddress(Info.basicAddress); // 오타 수정 및 const 선언
        setResults(response.data || []);
      } catch (error) {
        console.error('주소 검색 실패:', error);
      }
    };
    
  
    const handleResultClick = (addressName) => {
      const selectedData = results.find(item => item.address_name === addressName);

      if (selectedData) {
        setInfo(prev => ({
          ...prev,
          basicAddress: selectedData.address_name,
          x: selectedData.x || '',
          y: selectedData.y || ''
        }));
      }
    
      setResults([]);
      
    };
    const toggleAccordion = () => {
      const content = contentRef.current;
      if (!content) return;
    
      if (isOpen) {
        content.style.maxHeight = `${content.scrollHeight}px`; // 닫기 전 높이 설정
        requestAnimationFrame(() => {
          content.style.maxHeight = '0px';
        });
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    
      setIsOpen(!isOpen);
    };
    
   
   return (
    <CommonBox>
      <PageStyle>
        <HeaderBox>
          <HeaderContent>
            <HeaderIcons>
              <HeaderLeft onClick={handleBack}><CancleIcon /></HeaderLeft>
            </HeaderIcons>
            <HeaderTitle>개인정보 작성하기</HeaderTitle>
            <Temp>{/*임시저장*/}</Temp>

          </HeaderContent>
        </HeaderBox>
        <AppMain>
          <ContentBox>
            입금자명
            <NameInput 
            placeholder="입금자 명"
            value={Info.accountName}
            onChange={(e) => setInfo(prev => ({ ...prev, accountName: e.target.value }))}
            />
            계좌정보
            <BankDiv>
            <AccordionWrapper>
              <AccordionHeader onClick={toggleAccordion}>  {/*아직은 은행보내는건없음 */ }
                은행 선택
                <RotatedDown $isOpen={isOpen} />
              </AccordionHeader>
              <AccordionContentWrapper ref={contentRef}>
                <AccordionContentInner>
                <div>국민은행</div>
                <div>신한은행</div>
                <div>카카오뱅크</div>
                <div>국민은행</div>
                <div>신한은행</div>
                <div>카카오뱅크</div>
                <div>국민은행</div>
                <div>신한은행</div>
                <div>카카오뱅크</div>
        
                </AccordionContentInner>
              </AccordionContentWrapper>
            </AccordionWrapper>
              <AccountInput 
               placeholder="계좌번호"
               value={Info.accountNumber}
               onChange={(e) => setInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
             />
            </BankDiv>
            {'전화번호(선택)'}
            <PhoneDiv>
              <NumberInput 
              placeholder="전화번호를 입력해주세요."
              value={Info.phoneNumber}
              onChange={(e) => setInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
              />
              <NumberButton>전화번호 인증</NumberButton>  {/*아직은 전화인증없음 */ }
            </PhoneDiv>
            주소
            <AddressDiv>
              <Adiv>
                <AddressInput 
                value={Info.basicAddress}
                onChange={(e) =>
                  setInfo(prev => ({
                    ...prev,
                    basicAddress: e.target.value
                  }))
                }
                placeholder='주소를 입력해주세요.'/>
                <AddressButton
                onClick={search}
                >주소 검색</AddressButton>
               
              </Adiv>
              <SpecInput
               value={Info.detailAddress} 
               onChange={(e) => setInfo(prev => ({
                 ...prev,
                 detailAddress: e.target.value 
               }))}
              placeholder='상세주소를 입력하세요'/>
              {results.length > 0 && (
                <Dropdown>
                  {results.map((item, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => handleResultClick(item.address_name)}
                    >
                      {item.address_name}
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </AddressDiv>
            <PostButton onClick={handleSubmit}>
                    작성완료
            </PostButton>
          </ContentBox>

        </AppMain>
        <Footer />


      </PageStyle>
    </CommonBox>
   )
 }
 
 export default InfoSet

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
  padding: 16px;
  gap: 16px;
  box-sizing: border-box;

`

const HeaderBox=styled.div`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    background-color:#2C2C2E;
    padding: 15px 20px;
    font-size: 20px;
    display: flex;


`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  
`;

const HeaderTitle = styled.div`
  font-size: 20px;
  
`;
const HeaderIcons = styled.div`
  display: flex;
  width: 56px;

   
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  width: 100%; 
  height: 100%;

`;
const CancleIcon=styled(Cancle)`
  width: 24px;
  height: 24px;
`
const Temp = styled.div`
  color: #919191;
  font-size: 16px;
  width: 56px;
`
const ContentBox=styled.div`
   
    gap: 16px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`
const PostButton=styled.button`
    height: 53px;
    background-color: #08AC72;
    border: none;
    border-radius: 4px;
    font-size: 16px;
`
const NameInput=styled.input`
  height: 39px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background-color: #444448;
  border-radius: 4px;
  padding: 8px;

  &::placeholder{
    font-size: 16px;
    font-family: 'NeoSB',sans-serif;
    color: #6C6C74;
    padding: 8px;

  }
`
const BankDiv=styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 5px;
`
const AccountInput=styled.input`
  width: 70%;
  border: none;
  background-color: #444448;
  border-radius: 4px;
  height: 39px;
  
  &::placeholder{
    font-size: 16px;
    font-family: 'NeoSB',sans-serif;
    color: #6C6C74;
    padding: 8px;

  }
`
const PhoneDiv=styled.div`
  height: 39px;
  width: 100%;
  display: flex;
  gap: 5px;

`
const Adiv=styled.div`
  height: 39px;
  width: 100%;
  display: flex;
  gap: 5px;
  margin-bottom:8px;
`
const AddressDiv=styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

`
const NumberInput=styled.input`
  height: 39px;
  width: 70%;
  box-sizing: border-box;
  border: none;
  background-color: #444448;
  border-radius: 4px;
  padding: 8px;

  &::placeholder{
    font-size: 16px;
    font-family: 'NeoSB',sans-serif;
    color: #6C6C74;
    padding: 8px;

  }

`
const NumberButton=styled.button`
  height: 39px;
  width: 29%;
  background-color: #08AC72;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-family: 'NeoSB',sans-serif;
  @media (max-width: 400px) {
    font-size: 14px;  
  }

`
const AddressInput=styled.input`
  height: 39px;
  width: 70%;
  box-sizing: border-box;
  border: none;
  background-color: #444448;
  border-radius: 4px;
  padding: 8px;
  &::placeholder{
    font-size: 16px;
    font-family: 'NeoSB',sans-serif;
    color: #6C6C74;
    padding: 8px;

  }
`
const AccordionWrapper = styled.div`
  width: 29%;
  border: none;
  border-radius: 4px;
  overflow: hidden;
  background-color: #444448;
  color: white;
`;

const AccordionHeader = styled.div`
  
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #444448;
  font-size: 16px;
  font-family: 'NeoEB',sans-serif;
  height: 23px;
  padding: 8px 16px;
  @media (max-width: 400px) {
    font-size: 14px;  
  }


`;

const AccordionContentWrapper = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: #444448;
`;

const AccordionContentInner = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color:#444448;
  font-size: 16px;
  overflow-y: auto;
  scrollbar-width: none;
  height: 120px;
  @media (max-width: 400px) {
    font-size: 14px;  
  }
  
`;

const RotatedDown = styled(Down)`
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  width: 10px;
  height: 10px;
`;
const AddressButton=styled.button`
  height: 39px;
  width: 29%;
  background-color: #08AC72;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-family: 'NeoSB',sans-serif;
  @media (max-width: 400px) {
    font-size: 14px;  
  }

`

const Dropdown = styled.div`
  border: none;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: none;
  list-style: none;
`;

const DropdownItem = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #444448;
  &:hover {
    background-color:rgb(30, 30, 31);
  }
`;
const SpecInput=styled.input`
  height: 39px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background-color: #444448;
  border-radius: 4px;
  padding: 8px;

  &::placeholder{
    font-size: 16px;
    font-family: 'NeoSB',sans-serif;
    color: #6C6C74;
    padding: 8px;

  }
  `