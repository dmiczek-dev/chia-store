import React from 'react';
import { HeaderWrapper, LogoWrapper, PageTitle, StyledButton, StyledLogo } from './Header.styles';
import { Button } from '@material-ui/core';
import { setAccessToken } from '../../utils/accessToken';
import { useRouter } from 'next/router';

const Header = ({ pageTitle }) => {
    const router = useRouter()
    return (
        <HeaderWrapper>
            <LogoWrapper>
                <StyledLogo src="/img/chia-logov2.png" alt="Logo"/>
            </LogoWrapper>
            <PageTitle>
                {pageTitle}
            </PageTitle>
            <StyledButton>
                <Button variant="outlined" onClick={ ()=> {setAccessToken(); router.push('/login'); }}>Wyloguj</Button>
            </StyledButton>
        </HeaderWrapper>
    );
};

export default Header;
