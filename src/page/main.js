import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import CommonBox from "../style/CommonBox";
import {ReactComponent as Search} from '../asset/svgs/Search.svg'
import Itemcard from "../component/Itemcard";
import Footer from "../component/Footer";
import AlertIcon from "../component/icons/AlertIcon";
import Filter from "../component/Filter";
import { useLocation,useNavigate } from "react-router-dom";
import usePageFilterStore from '../store/filterStore';
import SearchIcon from "../component/icons/SearchIcon";
import {getUsedItem} from "../api/ItemApi"
import { useInView } from "react-intersection-observer";
import userStore from '../store/userStore'


function App() {
  const location=useLocation();
  const {filters,setFilter}=usePageFilterStore();
  const currentPage=location.pathname;
  const selectedFilter = filters[currentPage];
  const navigate=useNavigate();
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null); 
  const {ref,inView}=useInView({
    threshold: 0.5,
  });
  const [isLast,setIsLast]=useState(false);
  const accesstoken = userStore(state=>state.accessToken)
  const fetchItems = async () => {
    try {
      const data = await getUsedItem(cursor); 
      if (data && Array.isArray(data.content)) {
        console.log("아이템 배열:", data.content);
        setCursor(data.cursor); 
        if (!data.hasNext) {
          setIsLast(true);  // 마지막 페이지인지 여부 설정
        }
        
        // 기존 아이템에 새로 받은 아이템 추가
        setItems((prevItems) => [
          ...prevItems,
          ...data.content,  // 응답에서 받은 아이템 추가
        ]);
        // 배열 처리 로직
      } else {
        console.error("loadUsedItemDetails는 배열이 아닙니다.", data);
      }
      
      
      console.log(items)
    } catch (error) {
      console.error("아이템 데이터를 가져오는 데 실패했습니다:", error);
    }
  };
  
  useEffect(()=>{
    const loginstate=localStorage.getItem('LoginState');
    console.log("토큰",accesstoken)
    if (!loginstate) {
      navigate("/login"); 
    }
    
  }, [navigate]);

  useEffect(() => {
    if (inView && !isLast) {
      console.log("다음 페이지 요청");
      fetchItems();
    }
  }, [inView, isLast]); 


  return (
    <CommonBox>
      <PageStyle>
          <Header title={'홈'} leftIcon={<SearchIcon/>} rightIcon={<AlertIcon/>}/>
          <Filter
          filterShape={'else'}
          selectedFilter={selectedFilter}
          setSelectedFilter={(val)=>setFilter(currentPage,val)}
          />
          <AppMain>
          {items.length > 0 ? (
            items.map(item => (
              <Itemcard key={item.id} item={item} imgName={item.imageName} /> 
            ))
          ) : (
            <p>아이템이 없습니다.</p> 
          )}
          {isLast===false&&
            <div ref={ref}>Loading more...</div> }     
             
          </AppMain>
          
          <Footer/>
      </PageStyle>
    </CommonBox>
  );
}

export default App;

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

