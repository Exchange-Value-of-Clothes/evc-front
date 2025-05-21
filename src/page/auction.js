import React,{useState,useCallback,useEffect} from 'react'
import { useInView } from "react-intersection-observer";
import styled from 'styled-components'
import CommonBox from '../style/CommonBox'
import Footer from '../component/Footer'
import Header from '../component/Header'
import useFilterIconStore from '../store/filterIconStore';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as PointPlus} from '../asset/svgs/PointPlus.svg'
import AlertIcon from '../component/icons/AlertIcon'
import {ReactComponent as Filter} from "../asset/svgs/Filter_alt.svg"
import {ReactComponent as Search} from '../asset/svgs/Search.svg'
import {ReactComponent as Cancle} from '../asset/svgs/Cancle.svg'
import SearchIcon from "../component/icons/SearchIcon";

import AuctionCard from '../component/AuctionCard'
import CategoryModal from '../component/CategoryModal'
import {getAuctionItem} from "../api/ItemApi"
import useFetchUser from '../hook/useFetchUser';

function Auction() {
  const { selectedIcon, selectButton, resetSelection } = useFilterIconStore();
  
  const [isOpen,setIsOpen]=useState(false);
  const [cursor, setCursor] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [items, setItems] = useState([]);
  const { ref, inView } = useInView({ threshold: 0 });
  const { userInfo, fetchUser } = useFetchUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]); 
  const navigate = useNavigate();
  const handleSearch = (searchText) => {
    const existing = JSON.parse(localStorage.getItem("searchHistory_auc") || "[]");
  
    if (!existing.includes(searchText)) {
      const updated = [searchText, ...existing];
      localStorage.setItem("searchHistory_auc", JSON.stringify(updated));
    }
  
    navigate(`/SearchResAuc?query=${encodeURIComponent(searchText)}`);
    setIsExpanded((prevState) => !prevState);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(text);
    }
  };
  
  const handleHistoryClick = (item) => {
    setText(item);         // input에 값 세팅하려면 필요
    handleSearch(item);    // 클릭한 기록으로 검색 실행
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAddClick2 = () => {
    const stored = JSON.parse(localStorage.getItem("searchHistory_auc") || "[]");
    setHistory(stored);
    setIsExpanded((prevState) => !prevState);
  };
  const handleDelete = (item) => {
    const updated = history.filter((h) => h !== item);
    localStorage.setItem("searchHistory_auc", JSON.stringify(updated));
    setHistory(updated);
  };
 

  const fetchItems = async () => {
  if (isFetching) return;
  setIsFetching(true);
  try {
    const data = await getAuctionItem(cursor);
     if (data && Array.isArray(data.content)) {
        setCursor(data.cursor);
        if (!data.hasNext) setIsLast(true);
        setItems((prevItems) => [...prevItems, ...data.content]);
      }
  } catch (err) {
    console.error("아이템 요청 실패", err);
  } finally {
    setIsFetching(false);
  }
};

  

  const setModal=useCallback(()=>{
    setIsOpen((prev)=>!prev);
  },[])
  


  
  useEffect(() => {
    if (inView && !isLast && !isFetching) {
      fetchItems();
    }
  }, [inView, isLast, isFetching]);
  return (
    <CommonBox>
        <PageStyle>
          <HeaderWrapper>
            <Header title={'홈'} leftIcon={<SearchIcon onClick={handleAddClick2}/>} rightIcon={<AlertIcon/>}/>
          </HeaderWrapper>  
            <PageFilter>
                <FilterDiv onClick={setModal}><Filter/>필터</FilterDiv> {/**현재는 아이템종류안와서 안오면 폐기*/}
                <RemainPointBox>잔여단추<RemainPoin>{(userInfo.point).toLocaleString()}</RemainPoin><PointPlus/></RemainPointBox>
            </PageFilter>
            <AppMain>
            {items.length > 0 ? (
                items
                  .filter(item => 
                    !selectedIcon || selectedIcon.length === 0 || selectedIcon.includes(item.category)
                  )
                  .map(item => (
                    <AuctionCard key={item.id} myPoint={userInfo.point} item={item} imgName={item.imageName} />
                  ))
              ) : (
                <p>아이템이 없습니다.</p>
              )}
              {!isLast && <div ref={ref}></div>}
               
                
        
                
            </AppMain>
              <CategoryModal 
              isOpen={isOpen} close={setModal}
              selectedIcon={selectedIcon}
              selectButton={selectButton}
              resetSelection={resetSelection} />
            <Footer/>
        </PageStyle>
        {isExpanded && (
          <ExpandedContent>
          <SearchBox>
            <Search/>
            <SearchInput 
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"></SearchInput>
          </SearchBox>
          <Ldiv>최근 검색어</Ldiv>
          <HistoryBox>
              {history.map((item, idx) => (
              <SearchList key={idx}>
              <ListItem onClick={() => handleHistoryClick(item)}>{item}</ListItem>
              <StlyedCancle onClick={() => handleDelete(item)}>✕</StlyedCancle>
              </SearchList>
              ))}
          </HistoryBox>
            
          </ExpandedContent>
        )}
    </CommonBox>
  )
}

export default Auction

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
`
const PageFilter=styled.div`
  padding: 10px;
  gap:8px;
  display: flex;
  height: 5%;
  justify-content: space-between;
  align-items: center;
`

const AppMain=styled.div`
  flex:1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  gap: 25px;
`

const FilterDiv=styled.div`
  background-color: #17161B;
  color: #F4F4F4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18%;
  height: 100%;
  font-family: 'NeoM',sans-serif;


`
const RemainPointBox=styled.div`
    background-color: #000000;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 40%;
    height: 80%;
    margin-right: 2%;
    font-size: 80%;
    font-family: 'NeoEB',sans-serif;

`
const RemainPoin=styled.span`
    overflow-x: scroll;
    scrollbar-width: none;
    width: 40%;
    font-family: 'NeoM',sans-serif;
`
const ExpandedContent = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100dvh - 56px);
  background-color: #1C1C1E;
  z-index: 9;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  gap: 12px;
`;
const HeaderWrapper = styled.div`
  position: relative;
  z-index: 1001; // 헤더는 항상 제일 위에!
`;
const SearchBox=styled.div`
  width: 100%;
  height: 48px;
  border-radius: 24px;
  border: none;
  padding: 12px 16px;
  box-sizing: border-box;
  background-color: #444448;
  display: flex;
  align-items: center;
  gap: 10px;
`
const Ldiv=styled.div`
  font-size: 16px;
  font-family: 'NeoEB',sans-serif;

`
const SearchInput=styled.input`
  height: 100%;
  width: 100%;
  border: none;
  box-sizing: border-box;
  background-color: #444448;
  &::placeholder{
    font-family: 'NeoM',sans-serif;
    font-size: 12px;
    color:#F4F4F4 ;

  }

`
const HistoryBox =styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  gap: 8px;
`
const SearchList=styled.div`
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #2C2C2E;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StlyedCancle=styled(Cancle)`
  width: 20px;
  height: 20px;
`
const ListItem = styled.span`
  cursor: pointer;
`
