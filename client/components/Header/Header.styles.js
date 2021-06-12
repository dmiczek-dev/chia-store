import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 8rem;
  display: grid;
  grid-template-columns: 15rem 1fr 15rem;
  align-items: end;
  box-shadow: 0 2px 3px rgb(0 0 0 / 30%);
  grid-area: navbar;
`;

export const LogoWrapper = styled.div`
  border-right: 2px solid #eceaea;
  padding: 2rem 3rem;
`;

export const StyledLogo = styled.img`
  display: block;
  height: 100%;
`;

export const PageTitle = styled.h2`
  padding: 2rem 4rem;
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
`;

export const StyledButton = styled.div`
  padding: 2rem 4rem;
`;
