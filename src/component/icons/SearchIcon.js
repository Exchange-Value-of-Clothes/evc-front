import React from 'react'
import styled from 'styled-components';
import {ReactComponent as Search} from '../../asset/svgs/Search.svg'

function SearchIcon({ onClick }) {
  return <SearchIcons onClick={onClick} />;
}
export default SearchIcon

const SearchIcons = styled(Search)``