import React from 'react';
import { HeaderWrapper, LogoWrapper, PageTitle, StyledButton, StyledLogo } from './Header.styles';
import { Button } from '@material-ui/core';
import { setAccessToken } from '../../utils/accessToken';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter()
//TODO: Add logout endpoint
    return (
        <HeaderWrapper>
            <LogoWrapper>
                <StyledLogo src="/img/chia-logov2.png" alt="Logo"/>
            </LogoWrapper>
            <PageTitle>
                Tytuł zakładki
            </PageTitle>
            <StyledButton>
                <Button variant="outlined" onClick={ ()=> {setAccessToken(); router.push('/login'); }}>Wyloguj</Button>
            </StyledButton>
        </HeaderWrapper>
    );
};

export default Header;
