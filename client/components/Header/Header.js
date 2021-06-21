import React from 'react';
import { HeaderWrapper, LogoWrapper, PageTitle, StyledButton, StyledLogo } from './Header.styles';
import { Button } from '@material-ui/core';

const Header = () => {
    return (
        <HeaderWrapper>
            <LogoWrapper>
                <StyledLogo src="/img/chia-logov2.png" alt="Logo"/>
            </LogoWrapper>
            <PageTitle>
                Tytuł zakładki
            </PageTitle>
            <StyledButton>
                <Button variant="outlined">Wyloguj</Button>
            </StyledButton>
        </HeaderWrapper>
    );
};

export default Header;
