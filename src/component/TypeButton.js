import React from 'react';
import { memo} from 'react';
import styled from 'styled-components';

const TypeButton = memo(({ isSelected, onClick, children }) => {
  return (
    <Button isSelected={isSelected} onClick={onClick}>
      {children}
    </Button>
  );
}, (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected);

export default TypeButton;

const Button = styled.button`
  height: 100%;
  width: 77px;
  padding: 8px 16px;
  background-color: ${(props) => (props.isSelected ? '#08AC72' : '#444448')};
  border-radius: 32px;
  border: none;
  font-family: 'NeoSB', sans-serif;
  font-size: 13px;
`;
