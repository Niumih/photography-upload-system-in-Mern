import React from 'react';
import styled from 'styled-components';

// Footer container
const FooterContainer = styled.footer`
  background-color: var(--dark-orange);
  height: 2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  right:0;
`;

export const Footer = () => {
  const textStyle = {
    color: '#000000',
    top: '1.5rem',
    left: '1rem',
  };

  return (
    <FooterContainer>
      <span style={textStyle}>All rights reserved</span>
    </FooterContainer>
  );
};

export default Footer;