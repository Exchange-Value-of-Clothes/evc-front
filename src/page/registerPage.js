import React,{useState,useCallback,useRef,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import {ReactComponent as Cancle} from "../asset/svgs/Cancle.svg"
import {ReactComponent as Cancle2} from "../asset/svgs/Cancle2.svg"
import Footer from '../component/Footer';
import {ReactComponent as Registerimg} from "../asset/svgs/Register_img.svg"
import {ReactComponent as Rightarrow} from "../asset/svgs/Rightarrow.svg"
import TypeButton from '../component/TypeButton';
import {registerApi,postImg,s3Img,editUsedPost,editAucPost,getSpecUsedItem,getSpecAucItem} from "../api/ItemApi"
import { deleteDatabase,saveFormToDB,getFormFromDB } from '../util/imageTemp';
import CategoryModal from '../component/CategoryModal'
import TempModal from '../component/TempModal';

function RegisterPage() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]); 
  const [imagesToUpload, setImagesToUpload] = useState([]); 
  const thumbnailInput = useRef();

  const location = useLocation();
  const { itemType, itemsId } = location.state || {};

   useEffect(() => {
    // 둘 다 존재할 때만 실행
    if (itemType && itemsId) {
      const fetchData = async () => {
        try {
          if(itemType==='AUCTION'){
          await getSpecAucItem( itemsId); }
          else{
            await getSpecUsedItem( itemsId);
          }
        } catch (err) {
          console.error("특정 아이템 가져오기 실패", err);
        }
      };

      fetchData();
    }
  }, [itemType, itemsId]);
//이미지가 문제네

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    price:'',
    startPrice: '',
    bidPrice: '',
    transactionType: '',
    transactionMode: '',
    imageNames:[],
  });

  const selectButton = (category) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category === category ? "" : category,
    }));
  };
  const back =()=>{
    navigate(-1)
  }

  const resetSelection = () => {
    setFormData((prev) => ({ ...prev, category: "" }));
  };

  const [isOpen,setIsOpen]=useState(false); //카테고리모달
  const [isOpenTemp,setIsOpenTemp]=useState(false); //임시저장모달

  const setModal=useCallback(()=>{
    setIsOpen((prev)=>!prev);
  },[])

  const setTempModal=useCallback(()=>{
    setIsOpenTemp((prev)=>!prev);
  },[])

  const isFormFilled = Object.values(formData).every(value => value !== "" && value !== null);
  const hasImages = imagesToUpload.length > 0;


  const loadTempData = () => {
    getFormFromDB().then((data) => {
      if (data) {
        setFormData(data.formData);
        setSelectedImages(data.images.map((img) => img.dataURL));
        setImagesToUpload(
          data.images
            .filter((img) => {
              const allowedExtensions = ["jpg", "jpeg", "png"];
              const extension = img.name.split(".").pop().toLowerCase();
              return allowedExtensions.includes(extension);
            })
            .map((img) => {
              const mimeType = img.name.endsWith("jpeg") || img.name.endsWith("jpg")
                ? "image/jpeg"
                : "image/png";

              const base64Data = img.dataURL.split(",")[1];
              const byteCharacters = atob(base64Data);
              const byteArrays = [];

              for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                const byteArray = new Uint8Array(Math.min(1024, byteCharacters.length - offset));
                for (let i = 0; i < byteArray.length; i++) {
                  byteArray[i] = byteCharacters.charCodeAt(offset + i);
                }
                byteArrays.push(byteArray);
              }

              const blob = new Blob(byteArrays, { type: mimeType });
              const file = new File([blob], img.name, { type: mimeType });

              return file;
            })
        );
      }
      else {
        // 데이터가 없을 때
        alert("불러올 게 없습니다");
      }
    });
  };


  const imageDelete = (index)=>{
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagesToUpload((prev) => prev.filter((_, i) => i !== index));

  }

  const handleSave = async () => {
    await saveFormToDB(formData, imagesToUpload);
    alert("폼 데이터와 이미지가 임시 저장되었습니다.");
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    for (let file of files) {
      const fileType = file.type;
      if (!['image/jpeg', 'image/png','image/jpg'].includes(fileType)) {
        alert('허용되지 않는 파일 형식입니다.');
        return;
      }
      // 이미지 처리 로직 계속
    }
    const fileArray = Array.from(files); 
    const imageUrls = fileArray.map((file) => URL.createObjectURL(file)); // 각 파일의 미리보기 URL 생성
    setImagesToUpload((prevFiles) => [...prevFiles, ...fileArray]);
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
    
  };

  const handleIconClick = () => {
    thumbnailInput.current.click(); 
  };
  // 거래 유형 선택 (택배거래/직거래)
const handleType = useCallback((val) => {
  setFormData((prev) => ({
    ...prev,
    transactionMode: prev.transactionMode === val ? '' : val,
  }));
}, []);

// 거래 방식 선택 (구매/판매/경매)
const handleKind = useCallback((val) => {
  setFormData((prev) => ({
    ...prev,
    transactionType: prev.transactionType === val ? '' : val,
  }));
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData((prev) => ({
      ...prev,
      price: value,
    }));
  };

  const handleBidPriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData((prev) => ({
      ...prev,
      bidPrice: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isFormValid()) {
      alert("폼을 모두 채워주세요!");
      return;
    }
  
    try {
      // Step 1: 이미지 S3 업로드 (리스트 형태로 전달)
      const imageNames = imagesToUpload.map(img => img.name);
     
    
      const uploadedImageUrls = await postImg('useditem', imageNames); 


      const imageNames2 = uploadedImageUrls.map(uploadedImageUrls => uploadedImageUrls.imageName); //서버에서준이름
    
      // 업로드된 이미지와 원본 파일을 매칭하여 `s3Img` 호출
      uploadedImageUrls.forEach(({  presignedURL }, index) => {
        // 원본 파일 (imagesToUpload에서 인덱스로 가져오기)
        const file = imagesToUpload[index];
    
        // 파일명 추출 (S3 경로에서 마지막 `/` 이후 문자열)
       
        // 확장자 추출 (마지막 `.` 이후 문자열)
        const fileType = file.type.split('.').pop(); 
        //타입이 jpg jpeg png아니면 튕기는기능 넣기
    
        // s3Img 함수 호출
        s3Img(presignedURL, fileType, file); //현재 콜스에러뜨는중
      });
    
      const dataToSend =
        formData.transactionMode === 'AUCTION'
          ? {
              title: formData.title,
              category: formData.category,
              content: formData.content,
              startPrice: formData.price,
              bidPrice: formData.bidPrice,
              transactionType: formData.transactionType,
              imageNames: imageNames2,
            }
          : {
              title: formData.title,
              category: formData.category,
              content: formData.content,
              price: formData.price,
              transactionType: formData.transactionType,
              transactionMode: formData.transactionMode,
              imageNames: imageNames2,
            };


      // 타입에 따라 적절한 registerApi 호출
      if (formData.transactionMode === 'AUCTION') {
        await registerApi('auctionitems',dataToSend);
      } else {
        await registerApi('useditems',dataToSend);
      }
     
    
    
     
      alert("상품이 성공적으로 등록되었습니다!");
      navigate('/home')
    } catch (err) {
      console.error("등록 실패", err);
      alert("등록 중 오류가 발생했습니다.");
    }
    
    };
    const isFormValid = () => {
      const {
        title,
        category,
        content,
        price,
        startPrice,
        bidPrice,
        transactionType,
        transactionMode,
      } = formData;

      if (!title || !category || !content ||!transactionType) return false;

      if (transactionMode === 'BUY') {
        return price && hasImages
      }
      if (transactionMode === 'SELL') {
        return price && hasImages
      }

      if (transactionMode === 'AUCTION') {
        return price && bidPrice && hasImages;
      }
      

      return false;
    };

  return (
    <CommonBox>
      <PageStyle>
        <HeaderBox>
          <HeaderContent>
            <HeaderIcons>
              <HeaderLeft><CancleIcon onClick={back} /></HeaderLeft>
            </HeaderIcons>
            <HeaderTitle>상품 등록하기</HeaderTitle>
            <Temp onClick={setTempModal} >불러오기</Temp>
          </HeaderContent>
        </HeaderBox>
        <AppMain>
          <ImgDiv> <Registerimg onClick={handleIconClick} />
          
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              multiple
              ref={thumbnailInput}
              onChange={handleImageChange}
              style={{ display: 'none' }} 
            />
         <ThumbnailWrapper>
          {selectedImages.map((image, index) => (
            <ThumbnailContainer key={index}>
              <ThumbnailImage src={image} alt={`thumbnail-${index}`} />
              
              <ThumbnailCancle onClick={()=>imageDelete(index)} />
             
            </ThumbnailContainer>
          ))}
        </ThumbnailWrapper>
        
          </ImgDiv>

          <TitleDiv>
            제목
            <TitleInput placeholder='글 제목' name="title" value={formData.title} onChange={handleChange} />
          </TitleDiv>

          <TradeTypeDiv>
            거래 유형
            <TypeStateDiv>
             
                <TypeButton
                  children={"판매하기"}
                  isSelected={formData.transactionMode === ("SELL")}
                  onClick={() => handleType("SELL")}
                />     
                    <TypeButton
                  children={"구매하기"}
                  isSelected={formData.transactionMode === ("BUY")}
                  onClick={() => handleType("BUY")}
                />   
                    <TypeButton
                  children={"경매하기"}
                  isSelected={formData.transactionMode === ("AUCTION")}
                  onClick={() => handleType("AUCTION")}
                />   
            </TypeStateDiv>
          </TradeTypeDiv>

          <TradeKindDiv>
            거래 방식
            <KindStateDiv>
            <TypeButton
                  children={"택배거래"}
                  isSelected={formData.transactionType === ("DELIVERY")}
                  onClick={() => handleKind("DELIVERY")}
                />  
            <TypeButton
            children={"직거래"}
            isSelected={formData.transactionType === ("DIRECT")}
            onClick={() => handleKind("DIRECT")}
             />  
            </KindStateDiv>
          </TradeKindDiv>

          <CategoryButton
          name='category' onClick={setModal}
      
          >
          카테고리 <Rightarrow />
          </CategoryButton>

          <TextDiv>
            내용
            <TextInput  placeholder='내용을 입력해주세요.' name="content" value={formData.content} onChange={handleChange} />
          </TextDiv>

          <PriceDiv>
            가격
            <PriceInput  placeholder='가격을 입력해주세요.' name="price" value={formData.price} onChange={handlePriceChange} />
          </PriceDiv>

          {formData.transactionMode === "AUCTION" && (
            <AskPriceDiv>
              호가
              <AskPriceInput  placeholder='호가를 입력해주세요.' name="bidPrice" value={formData.bidPrice} onChange={handleBidPriceChange} />
            </AskPriceDiv>
          )}
          <Buttons>
            <TempSave  onClick={handleSave}>임시저장</TempSave>
            <Register onClick={handleSubmit} disabled={!isFormValid()}>등록하기</Register>
          </Buttons>
        </AppMain>
        <CategoryModal isOpen={isOpen} close={setModal}
            selectedIcon={formData.category}  // formData.category 사용
            selectButton={selectButton} 
            resetSelection={resetSelection} />
        <TempModal isOpen={isOpenTemp} close={setTempModal} loadTempData={loadTempData}/>
        <Footer />
      </PageStyle>
    </CommonBox>
  );
}

export default RegisterPage;

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
  margin: 16px;
`;
const HeaderIcons = styled.div`
    display: flex;
    gap: 20px;
   
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; 
  height: 100%;

`;
const CancleIcon=styled(Cancle)`
  width: 24px;
  height: 24px;
`
const Temp = styled.span`
  color: #919191;
  font-size: 16px;
`
const ImgDiv= styled.div`
  width: 100%;
  min-height: 70px;
  display: flex;
  
`
const TitleDiv= styled.div`
  width: 100%;
  min-height: 70px;
  font-family: 'NeoEB',sans-serif;
  display: flex;
  gap: 8px;
  flex-direction:column;
`
const TitleInput=styled.input`
  width:100%;
  min-height: 38px;
  box-sizing:border-box;
  border-radius: 4px;
  border: none;
  background-color: #444448;
  padding: 8px;
  &::placeholder{
    font-size: 16px;
    font-family: 'NeoSB',sans-serif;
    color: #6C6C74;
  }

`
const TradeTypeDiv= styled.div`
  width: 100%;
  min-height: 70px;
  gap: 8px;
  font-family: 'NeoEB',sans-serif;
  display: flex;
  gap: 8px;
  flex-direction:column;

`
const TypeStateDiv= styled.div`
  width: 100%;
  min-height: 38px;
  display: flex;
  gap:8px;
`


const TradeKindDiv= styled.div`
  width: 100%;
  min-height: 70px;
  gap: 8px;
  font-family: 'NeoEB',sans-serif;
  display: flex;
  gap: 8px;
  flex-direction:column;


`
const KindStateDiv= styled.div`
  width: 100%;
  min-height: 38px;
  display: flex;
  gap:8px;
`


const CategoryButton= styled.button`
  width: 100%;
  min-height: 60px;
  border-radius: 4px;
  border: none;
  background-color: #444448;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'NeoEB',sans-serif;
  font-size: 16px;

`
const TextDiv= styled.div`
  width: 100%;
  min-height: 150px;
 
  font-family: 'NeoEB',sans-serif;
  display: flex;
  gap: 8px;
  flex-direction:column;


`
const TextInput=styled.textarea`
  width: 100%;
  min-height: 120px;
  box-sizing:border-box;
  border-radius: 4px;
  border: none;
  background-color: #444448;
  padding: 8px;
  resize: none; /* 크기 조절 비활성화 */

  &::placeholder{
    font-size: 16px;
    font-family: 'NeoSB',sans-serif;
    color: #6C6C74;
    
  }

`
const PriceDiv= styled.div`
  width: 100%;
  min-height: 70px;
  display: flex;
  gap: 8px;
  flex-direction:column;
  font-family: 'NeoEB',sans-serif;


`
const PriceInput=styled.input`
  width: 100%;
  min-height: 38px;
  box-sizing:border-box;
  border-radius: 4px;
  border: none;
  background-color: #444448;
  padding: 8px;

  &::placeholder{
    font-size: 16px;
    font-family: 'NeoSB',sans-serif;
    color: #6C6C74;
  }

`
const AskPriceDiv= styled.div`
  width: 100%;
  min-height: 70px;
  display: flex;
  gap: 8px;
  flex-direction:column;
  font-family: 'NeoEB',sans-serif;


`
const AskPriceInput=styled.input`
  width: 100%;
  min-height: 38px;
  box-sizing:border-box;
  border-radius: 4px;
  border: none;
  background-color: #444448;
  padding: 8px;

  &::placeholder{
    font-size: 16px;
    font-family: 'NeoSB',sans-serif;
    color: #6C6C74;
  }

`
const Register = styled.button`
  width: 49%;
  min-height: 53px;
  background-color: ${(prop)=>(prop.disabled?"#757575":"#08AC72")};
  border-radius: 4px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  

  
`

const ThumbnailWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  margin-left: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  white-space: nowrap;
  max-width: 80%;
  -webkit-overflow-scrolling: touch;

`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 55px; 
  height: 55px; 
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const ThumbnailCancle=styled(Cancle2)`
  width: 14px;
  height: 14px;
  position: absolute;
  top: 0px;
  right: 0px;
`
const Buttons=styled.div`
  display: flex;
  gap: 10px;
`
const TempSave=styled.button`
  width: 49%;
  min-height: 53px;
  background-color: #444448;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  
`



