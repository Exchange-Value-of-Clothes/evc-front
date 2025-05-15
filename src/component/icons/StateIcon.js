import React from 'react'
import styled from 'styled-components';

function StateIcon({color,text}) {
  return (
    <Box $color={color}>
        <Span $color={color}>
            {text}
        </Span>
    </Box>
  )
}

export default StateIcon

const Box = styled.div`
    height: 24px;
    width: 38px;
    border: 1px solid ${(props) => props.$color};
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Span = styled.span`
    font-size: 12px;
    color: ${(props) => props.$color};
`
