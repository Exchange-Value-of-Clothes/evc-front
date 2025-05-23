import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import defaultImg from '../asset/image/defaultImg.png'
import {ReactComponent as ProfileAdd} from "../asset/svgs/ProfileAdd.svg"
import { Link } from 'react-router-dom';
import useFetchUser from '../hook/useFetchUser';
import {ReactComponent as Cancle2} from "../asset/svgs/Cancle2.svg"
import { postImg_profile,editUser } from '../api/userApi';
import { s3Img } from '../api/ItemApi';
import { useNavigate } from 'react-router-dom';

const IMG_URL = process.env.REACT_APP_CLOUD_FRONT;
 
function ProfileSetting() { 
    const nav=useNavigate();
    const { userInfo, fetchUser } = useFetchUser();
    const [editData, setEditData] = useState({ 
        nickname : '',
        imageName : ''});
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesToUpload, setImagesToUpload] = useState([]);
    

    const fileInputRef = React.useRef(null);
    const handleAddIconClick = () => {
        fileInputRef.current.click(); // AddIcon 클릭 시 input 열기
      };




      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
      
        const fileType = file.type;
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)) {
          alert('허용되지 않는 파일 형식입니다.');
          return;
        }
      
        const imageUrl = URL.createObjectURL(file);
        setImagesToUpload([file]); // 하나만 저장
        setSelectedImages([imageUrl]); // 미리보기도 하나만
      };
      

      const imageDelete = (index)=>{
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
        setImagesToUpload((prev) => prev.filter((_, i) => i !== index));
    
      }

      const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
      };

    

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageName = editData.imageName; 
            if (imagesToUpload.length > 0) {
                const file = imagesToUpload[0];
                const uploadedImageData = await postImg_profile([file.name]);
          
                const { presignedURL } = uploadedImageData;
                const fileType = file.type.split('/')[1];
          
                if (!['jpeg', 'png', 'jpg'].includes(fileType)) {
                  alert("허용되지 않는 이미지 형식입니다.");
                  return;
                }
          
                await s3Img(presignedURL, fileType, file);
                imageName = uploadedImageData.imageName; // 새 이미지로 교체
              }
      
          
          const dataToSend = {
            ...editData,
            imageName, 
          };
      
      
          alert("프로필이 성공적으로 등록되었습니다!");
          // 여기에 최종 API 요청 함수 호출하면 됨
          
          await editUser(dataToSend.nickname,dataToSend.imageName)
          nav('/mypage')
      
        } catch (err) {
          console.error("등록 실패", err);
          alert("등록 중 오류가 발생했습니다.");
        }
      };
      useEffect(() => {
        if (userInfo) {
          setEditData({
            nickname: userInfo.nickname || '',
            imageName: userInfo.imageName || '',
          });
        }
      }, [userInfo]);
    
  return (
    <CommonBox >
        <PageStyle>
            <Header2 title={"프로필 수정"} icon={<BackIcon/>}></Header2>      
            <AppMain>   
                <ProfileDiv>
                <ProfileImgDiv>
                    <ProfileImgbox>
                        {selectedImages[0]?<ThumbnailCancle onClick={()=>imageDelete(0)}/>:null}
                        <ProfileImg src={selectedImages[0]||(userInfo.imageName ? `${IMG_URL}/${userInfo.imageName}` : null) ||defaultImg}/>
                    </ProfileImgbox>
                    <AddIcon onClick={handleAddIconClick} />
                    <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    />
                </ProfileImgDiv>
                </ProfileDiv>

                <SettingDiv>
                    <NameChangeDiv>
                        <NameInput
                            placeholder={userInfo.nickname || "닉네임"}
                            name="nickname"
                            value={editData.name}
                            onChange={handleChange}
                          />
                          <NameChange onClick={handleSubmit}>
                            닉네임 변경
                          </NameChange>
                    </NameChangeDiv>
                    <Change onClick={handleSubmit}>변경</Change> 
                    <PasswordSetDiv>
                     
                        <PasswordChange>
                            <Link to={"/passwordpage"} style={{textDecoration:'none'}}>
                            계정정보 페이지 이동
                            </Link>
                        </PasswordChange>   
                    </PasswordSetDiv>   
                
                </SettingDiv>
                                          
            </AppMain>
            <Footer/>
        </PageStyle>
    </CommonBox>
  )
}

export default ProfileSetting

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
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ProfileImgDiv=styled.div`
   
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
const AddIcon=styled(ProfileAdd)`
    position: absolute;
    bottom: 0;
    right: 0;
   
`
const SettingDiv=styled.div`
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap:10px;

`
const NameChangeDiv=styled.div`
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`

const PasswordSetDiv=styled.div`
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    
`
const NameInput=styled.input`
    width: 73%;
    height: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    background-color: #444448;
    font-family: 'NeoSB',sans-serif;
    font-size: 16px;
    padding: 16px 10px;
    &::placeholder{
        font-size: 16px;
        font-family: 'NeoSB',sans-serif;
        color:#F4F4F4;
    }

`
const NameChange=styled.button`
    width: 25%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2C2C2E;
    font-family: 'NeoSB',sans-serif;
    font-size: 13px;
`


const PasswordChange=styled.button`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2C2C2E;
    font-family: 'NeoSB',sans-serif;
    font-size: 13px;

`
const Change=styled.button`
    width: 100%;
    height: 55px;

    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2C2C2E;
`
const ThumbnailCancle=styled(Cancle2)`
  width: 14px;
  height: 14px;
  position: absolute;
  top: 0px;
  right: 0px;
`


