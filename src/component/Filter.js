import React from 'react';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import styled from 'styled-components';
import { ReactComponent as FilterIcon } from '../asset/svgs/Filter_alt.svg';

function Filter({ filterShape, addAuc, selectedFilter, setSelectedFilter }) {
  const handleFilterClick = (filter) => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
    }
  };

  return (
    <FilterDiv>
      {filterShape === 'ham' ? (
        <FilterIconDiv>
          <MenuSharpIcon />
        </FilterIconDiv>
      ) : (
        <FilterIconDiv $wide>
          <FilterIcon /> 필터
        </FilterIconDiv>
      )}

      {['전체', '구매', '판매', addAuc && '경매'].filter(Boolean).map((type) => (
        <FilterButton
          key={type}
          $selected={selectedFilter === type}
          onClick={() => handleFilterClick(type)}
        >
          {type}
        </FilterButton>
      ))}
    </FilterDiv>
  );
}

export default Filter;

// ✅ 스타일 코드 최적화
const FilterDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  gap: 8px;
  display: flex;
  margin-top: 16px;
`;

const FilterIconDiv = styled.div`
  background-color: #17161b;
  color: #f4f4f4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $wide }) => ($wide ? '90px' : '40px')};
  font-family: 'NeoM', sans-serif;
`;

// ✅ 버튼 스타일을 공통 컴포넌트로 정리
const FilterButton = styled.div`
  background-color: ${({ $selected }) => ($selected ? '#353539' : '#17161B')};
  color: #f4f4f4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 61px;
  font-family: 'NeoM', sans-serif;
  cursor: pointer;
  transition: background-color 0.1s ease, color 0.1s ease;

  &:hover {
    background-color: #2a2a2e;
  }
`;
