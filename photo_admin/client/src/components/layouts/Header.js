import React from 'react';
import styled from 'styled-components';


export const Header = () => {
  return (
    <MainContainer><h1>Photographs upload</h1></MainContainer>
  )
}

//main container
const MainContainer = styled.header`
  background-color :#000000;
  height : 10rem;

  h1{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFA500;
    font-weight: 900;
   }
`;
export default Header;



