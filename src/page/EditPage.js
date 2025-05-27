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
import {postImg,s3Img,editUsedPost,editAucPost,getSpecUsedItem,getSpecAucItem} from "../api/ItemApi"
import CategoryModal from '../component/CategoryModal'

const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;


function RegisterPage() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]); 
  const [imagesToUpload, setImagesToUpload] = useState([]); 
  const thumbnailInput = useRef();
  const [isAuctionReadOnly, setIsAuctionReadOnly] = useState(false);
  const location = useLocation();
  const { itemType, itemsId } = location.state || {};

  useEffect(() => {
  if (itemType && itemsId) {
    const fetchData = async () => {
      try {
        if (itemType === 'AUCTION') {
          const res = await getSpecAucItem(itemsId);
          setSelectedImages(res.imageNameList.map(name => ({
            src: `${IMG_URL}/${name}`,
            fromServer: true,
            name,
            })));
          setFormData(prev => ({
            ...prev,
            title: res.title,
            category: res.category,
            content: res.content,
            startPrice: res.startPrice,
            bidPrice: res.bidPrice,
            transactionType: res.transactionType,
            transactionMode:'AUCTION'
          }));
          setIsAuctionReadOnly(true); // startPrice, bidPrice 잠금
         
        } else {
          const res = await getSpecUsedItem(itemsId);
          setSelectedImages(res.imageNames.map(name => ({
            src: `${IMG_URL}/${name}`,
            fromServer: true,
            name,
            })));
          setFormData(prev => ({
            ...prev,
            title: res.title,
            category: res.category,
            content: res.content,
            price: res.price,
            transactionType: res.transactionType,
            transactionMode: res.transactionMode,
          }));
          setIsAuctionReadOnly(false);
         
        }
      } catch (err) {
        console.error("특정 아이템 가져오기 실패", err);
      }
    };

    fetchData();
  }
}, [itemType, itemsId]);


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
    addImageNames:[],
    removeImageNames:[],
    thumbnailImage:''
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

  const setModal=useCallback(()=>{
    setIsOpen((prev)=>!prev);
  },[])




  const imageDelete = (index) => {
  setSelectedImages((prev) => {
    const imageToDelete = prev[index];
    
    // 서버에서 온 이미지라면 삭제 리스트에 추가
    if (imageToDelete.fromServer) {
      setFormData((form) => ({
        ...form,
        removeImageNames: [...form.removeImageNames, imageToDelete.name],
      }));
    } else {
      // 새로 업로드한 이미지면 imagesToUpload에서도 제거
      setImagesToUpload((prevUpload) =>
        prevUpload.filter((_, i) => i !== prev.filter(img => !img.fromServer).findIndex((img, j) => j === index))
      );
    }

    // 최종적으로 selectedImages에서 제거
    return prev.filter((_, i) => i !== index);
  });
};




  const handleImageChange = (e) => {
  const files = e.target.files;
  const fileArray = Array.from(files);
  const newImages = [];

  for (let file of fileArray) {
    const fileType = file.type;
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)) {
      alert('허용되지 않는 파일 형식입니다.');
      return;
    }
    // 새 이미지 객체를 생성해서 배열에 추가
    newImages.push({
      src: URL.createObjectURL(file),
      fromServer: false,
      name: file.name,
      file,  // 혹시 업로드 용도로 원본 파일도 저장해두고 싶으면
    });
  }

  setImagesToUpload((prevFiles) => [...prevFiles, ...fileArray]);
  setSelectedImages((prevImages) => [...prevImages, ...newImages]);
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
    // 1. 새 이미지가 있다면 업로드를 먼저 처리
    if (imagesToUpload.length > 0) {
      const imageNames = imagesToUpload.map((img) => img.name);
      const uploadedImageUrls = await postImg("useditem", imageNames);

      const newImageNames = uploadedImageUrls.map((uploaded) => uploaded.imageName);
      formData.addImageNames = newImageNames;

      uploadedImageUrls.forEach(({ presignedURL }, index) => {
        const file = imagesToUpload[index];
        const fileType = file.type.split("/").pop();

        if (!["jpg", "jpeg", "png"].includes(fileType)) {
          throw new Error("지원하지 않는 이미지 형식입니다.");
        }

        s3Img(presignedURL, fileType, file);
      });
    }

    // 2. 썸네일 이미지 설정
    if (formData.addImageNames && formData.addImageNames.length > 0) {
      formData.thumbnailImage = formData.addImageNames[0]; // addImageNames는 이미 문자열 배열이니까 그대로 사용
    } else if (selectedImages.length > 0) {
      // selectedImages는 객체 배열이라 name만 뽑아서 넣어줌
      formData.thumbnailImage = selectedImages[0].name;
    }


    // 3. 전송할 데이터 구성
    const dataToSend =
      formData.transactionMode === "AUCTION"
        ? {
            title: formData.title,
            category: formData.category,
            content: formData.content,
            startPrice: formData.price,
            bidPrice: formData.bidPrice,
            transactionType: formData.transactionType,
            addImageNames: formData.addImageNames,
            removeImageNames: formData.removeImageNames,
            thumbnailImage: formData.thumbnailImage,
          }
        : {
            title: formData.title,
            category: formData.category,
            content: formData.content,
            price: formData.price,
            transactionType: formData.transactionType,
            transactionMode: formData.transactionMode,
            addImageNames: formData.addImageNames,
            removeImageNames: formData.removeImageNames,
            thumbnailImage: formData.thumbnailImage,
          };

    // 4. API 호출
    if (formData.transactionMode === "AUCTION") {
      let res=await editAucPost(itemsId, dataToSend);
      
    } else {
       let res=await editUsedPost(itemsId, dataToSend);
            

    }

    alert("상품이 성공적으로 수정되었습니다!");
    navigate("/home");
  } catch (err) {
    console.error("수정 실패", err);
    alert("수정 중 오류가 발생했습니다.");
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
      if (selectedImages.length === 0) return false;
      
      if (!title || !category || !content ||!transactionType) return false;

      if (transactionMode === 'BUY') {
        return price 
      }
      if (transactionMode === 'SELL') {
        return price 
      }

      if (transactionMode === 'AUCTION') {
        return startPrice && bidPrice
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
            <HeaderTitle>수정하기</HeaderTitle>
            <Temp></Temp>
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
                <ThumbnailImage src={image.src} alt={`thumbnail-${index}`} />
                <ThumbnailCancle onClick={() => imageDelete(index)} />
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
             {itemType === 'AUCTION' ? (
                <TypeButton
                    children={"경매하기"}
                    isSelected={formData.transactionMode === "AUCTION"}
                    onClick={() => handleType("AUCTION")}
                />
                ) : (
                <>
                    <TypeButton
                    children={"판매하기"}
                    isSelected={formData.transactionMode === "SELL"}
                    onClick={() => handleType("SELL")}
                    />
                    <TypeButton
                    children={"구매하기"}
                    isSelected={formData.transactionMode === "BUY"}
                    onClick={() => handleType("BUY")}
                    />
                </>
                )}
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
          {formData.transactionMode !== "AUCTION" && (
            <PriceDiv>
                가격
                <PriceInput
                placeholder='가격을 입력해주세요.'
                name="price"
                value={formData.price}
                onChange={handlePriceChange}
                disabled={itemType === 'AUCTION'}
                readOnly={isAuctionReadOnly}
                />
            </PriceDiv>
            )}

          {formData.transactionMode === "AUCTION" && (
            <AskPriceDiv>
                호가
                <AskPriceInput
                placeholder='호가를 입력해주세요.'
                name="bidPrice"
                value={formData.bidPrice}
                onChange={handleBidPriceChange}
                disabled={itemType === 'AUCTION'}
                readOnly={isAuctionReadOnly}
                />
            </AskPriceDiv>
            )}

            {formData.transactionMode === "AUCTION" && (
            <PriceDiv>
                가격
                <PriceInput
                placeholder='가격을 입력해주세요.'
                name="startprice"
                value={formData.startPrice}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData((prev) => ({
                    ...prev,
                    startPrice: value,
                  }));
                }}
                disabled={itemType === 'AUCTION'}
                readOnly={isAuctionReadOnly}
                />
            </PriceDiv>
            )}
          <Buttons>
            
            <Register onClick={handleSubmit} disabled={!isFormValid()}>등록하기</Register>
          </Buttons>
        </AppMain>
        <CategoryModal isOpen={isOpen} close={setModal}
            selectedIcon={formData.category}  // formData.category 사용
            selectButton={selectButton} 
            resetSelection={resetSelection} />
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
const TextInput=styled.input`
  width: 100%;
  min-height: 120px;
  box-sizing:border-box;
  border-radius: 4px;
  border: none;
  background-color: #444448;
  padding: 8px;
  
  justify-content: flex-start;
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
  width: 100%;
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




