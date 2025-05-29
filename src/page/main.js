import React, { useState, useEffect,useRef  } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import CommonBox from "../style/CommonBox";
import {ReactComponent as Search} from '../asset/svgs/Search.svg'
import {ReactComponent as Cancle} from '../asset/svgs/Cancle.svg'
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
  const [isExpanded, setIsExpanded] = useState(false); 
  const location = useLocation();
  const { filters, setFilter } = usePageFilterStore();
  const currentPage = location.pathname;
  const selectedFilter = filters[currentPage];
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const { ref, inView } = useInView({ threshold: 0 });
  const [isLast, setIsLast] = useState(false);
  const accesstoken = userStore(state => state.accessToken);
  const [isFetching, setIsFetching] = useState(false);
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  // ✅ 필터별 스크롤 위치 저장용 ref
  const scrollPositionsRef = useRef({});
  const appMainRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const existing = JSON.parse(localStorage.getItem("searchHistory") || "[]");

    if (!existing.includes(text)) {
      const updated = [text, ...existing]; // 새 검색어를 맨 앞에 추가
      localStorage.setItem("searchHistory", JSON.stringify(updated));
    }
    navigate(`/SearchResult?query=${encodeURIComponent(text)}`);
    setIsExpanded((prevState) => !prevState);

    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAddClick = () => {
    const stored = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(stored);
    setIsExpanded((prevState) => !prevState);
  };
  const handleDelete = (item) => {
    const updated = history.filter((h) => h !== item);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
    setHistory(updated);
  };
 
  

  const fetchItems = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const data = await getUsedItem(cursor, selectedFilter);
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

  const filteredItems = items.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'BUY') return item.transactionMode === 'BUY';
    if (selectedFilter === 'SELL') return item.transactionMode === 'SELL';
    return true;
  });

 /* useEffect(() => {
    const loginstate = localStorage.getItem('LoginState');
    if (!loginstate) {
      navigate("/login");
    }
  }, [navigate]);*/

  useEffect(() => {
    if (inView && !isLast && !isFetching) {
      fetchItems();
    }
  }, [inView, isLast, isFetching]);

  // ✅ 필터가 바뀌기 전에 현재 스크롤 위치 저장
  useEffect(() => {
    return () => {
      if (appMainRef.current) {
        scrollPositionsRef.current[selectedFilter] = appMainRef.current.scrollTop;
      }
    };
  }, [selectedFilter]);

  // ✅ 필터가 바뀐 후 저장된 위치로 스크롤 이동
  useEffect(() => {
    const pos = scrollPositionsRef.current[selectedFilter] || 0;
    if (appMainRef.current) {
      appMainRef.current.scrollTop = pos;
    }
  }, [selectedFilter]);

 
  return (
    <CommonBox>
      <PageStyle>
        <HeaderWrapper>
        <Header title={isExpanded===true?'검색':'홈'} leftIcon={<SearchIcon onClick={handleAddClick} />} rightIcon={<AlertIcon />} />
        </HeaderWrapper>
        <Filter
          filterShape={'else'}
          selectedFilter={selectedFilter}
          setSelectedFilter={(val) => setFilter(currentPage, val)}
        />
        <AppMain ref={appMainRef}>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <Itemcard key={item.id} item={item} imgName={item.imageName} />
            ))
          ) : (
            <p>아이템이 없습니다.</p>
          )}
          {!isLast && <div ref={ref}></div>}
        </AppMain>
        
        <Footer />
        
       
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
                <span>{item}</span>
              <StlyedCancle onClick={() => handleDelete(item)}>✕</StlyedCancle>
              </SearchList>
              ))}
          </HistoryBox>
            
          </ExpandedContent>
        )}
      
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

