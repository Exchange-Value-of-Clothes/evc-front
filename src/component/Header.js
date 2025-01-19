import React from 'react'
import styled from 'styled-components'

function Header({ title, leftIcon, rightIcon }) {
    return (
      <HeaderBox>
        <HeaderContent>
          <HeaderTitle>{title}</HeaderTitle>
          <HeaderIcons>
            <HeaderLeft>{leftIcon}</HeaderLeft>
            <HeaderRight>{rightIcon}</HeaderRight>
          </HeaderIcons>
        
        </HeaderContent>
      </HeaderBox>
    );
  }
export default Header

Header.defaultProps = {
    leftIcon: null,  // 아이콘을 기본값으로 null로 설정
    rightIcon: null, // 아이콘을 기본값으로 null로 설정
  };

const HeaderBox=styled.div`
    width: 100%;
    height: 6%;
    box-sizing: border-box;
    background-color:#2C2C2E;
    padding: 15px 20px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;

`
const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
`;


const HeaderTitle = styled.div`
  font-size: 20px;
`;
const HeaderIcons = styled.div`
    display: flex;
    gap: 20px;
`;

const HeaderLeft = styled.div`

`;

const HeaderRight = styled.div`
   
`;