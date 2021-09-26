import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 13rem 1fr 10rem;
  box-shadow: 0 2px 3px rgb(0 0 0 / 30%);
  align-items: end;
  grid-area: navbar;
  height: 100%;
  > * {
    height: 100%;
    width: auto;
    min-height: 0;
  }
`;

export const LogoWrapper = styled.div`
  padding: 1.5rem;
  border-right: 2px solid #eceaea;
  box-sizing: border-box;
`;

export const StyledLogo = styled.img`
  height: 100%;
  object-fit: contain;
`;

export const PageTitle = styled.h2`
  padding: 1.5rem;
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
  display: flex;
  align-items: flex-end;
`;

export const StyledButton = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
`;
