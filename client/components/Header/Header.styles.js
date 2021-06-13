import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 15rem 1fr 10rem;
  box-shadow: 0 2px 3px rgb(0 0 0 / 30%);
  align-items: end;
  grid-area: navbar;
`;

export const LogoWrapper = styled.div`
  border-right: 2px solid #eceaea;
  box-sizing: border-box;
`;

export const StyledLogo = styled.img`
  padding: 1em 2em 2em 2em;
  height: 100%;
  object-fit: cover;
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
