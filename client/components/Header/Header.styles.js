import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  max-height: 100px;
  min-height: 50px;
  display: grid;
  grid-template-columns: 15rem 1fr 10rem;
  box-shadow: 0 2px 3px rgb(0 0 0 / 30%);
  align-items: end;
  grid-area: navbar;
  overflow: hidden;
`;

export const LogoWrapper = styled.div`
  border-right: 2px solid #eceaea;
  padding: 1em 2em 2em 2em;
  box-sizing: border-box;
`;

export const StyledLogo = styled.img`
  height: 100%;
`;

export const PageTitle = styled.h2`
  padding: 2rem 4rem;
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
`;

export const StyledButton = styled.div`
  padding: 0rem 1rem 2.5rem 0rem;
`;
