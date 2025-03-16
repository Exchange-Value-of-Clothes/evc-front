import React,{useState,useRef}from 'react'
import styled from 'styled-components'
import CommonBox from "../style/CommonBox";
import BackIcon from '../component/icons/BackIcon';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import eximg from '../asset/image/샌즈.jpg'
import EtcIcon from '../component/icons/EtcIcon';
import SlidingPanel from '../component/Sliding';
import { useLocation } from "react-router-dom";
import usePageFilterStore from '../store/filterStore';
import Filter from '../component/Filter';
import Itemcard from "../component/Itemcard";

function WhoStore() {
    const targetRef = useRef(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const location=useLocation();
    const {filters,setFilter} = usePageFilterStore();
    const currentPage = location.pathname;
    const selectedFilter=filters[currentPage];

  const togglePanel = (e) => {
    e.stopPropagation();

    setIsPanelOpen(!isPanelOpen);
  };
  return (
    <CommonBox ref={targetRef}>
        <PageStyle>
            <Header2 title={"상점"} icon={<BackIcon/>}></Header2>
           
                <ProfileBox>
                    <ImgBox>
                        <ProfileImg src={eximg} alt=''/>
                    </ImgBox>
                    <Profile>
                        <PostCount>
                            {0}
                        </PostCount>
                        게시물
                    </Profile>
                </ProfileBox>
                <Filter 
                filterShape={'ham'}
                addAuc={true} 
                selectedFilter={selectedFilter} 
                setSelectedFilter={(val)=>setFilter(currentPage,val)} />
            <AppMain>
                <Itemcard  onClick={togglePanel} extraIcon={<EtcIcon/>}/>
           
                <SlidingPanel isOpen={isPanelOpen} onClose={togglePanel} targetRef={targetRef} />
            </AppMain>
            <Footer/>
        </PageStyle>
    </CommonBox>
  )
}

export default WhoStore

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
const ProfileBox = styled.div`
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    border-bottom: solid 1px #4A4A4A;
`

const ImgBox=styled.div`
    background-color: #F4F4F4;
    width:  64px;
    height: 64px;
    @media (max-height: 700px){
        width:  64px;
        height: 64px;
    }
    border-radius: 50%; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    overflow: hidden; 
`
const ProfileImg=styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;

`
const PostCount=styled.div`
    font-size: 16px;

`
const Profile=styled.div`
    height: 40%;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;

`
