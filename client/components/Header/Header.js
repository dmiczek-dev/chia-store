import React from 'react';
import { HeaderWrapper, LogoWrapper, PageTitle, StyledButton, StyledLogo } from './Header.styles';
import { Button } from '@material-ui/core';
import { setAccessToken } from '../../utils/accessToken';
import { useRouter } from 'next/router';
import { useFetch } from '../../hooks/useFetch';

const Header = ({ pageTitle }) => {
    const router = useRouter();
    const {fetchData} = useFetch(process.env.NEXT_PUBLIC_URL + "logout", true)

    const handleLogout = async () => {
        await fetchData()
        setAccessToken();
        await router.push('/login');
    };
    
    return (
        <HeaderWrapper>
            <LogoWrapper>
                <StyledLogo src="/img/chia-logov2.png" alt="Logo"/>
            </LogoWrapper>
            <PageTitle>
                {pageTitle}
            </PageTitle>
            <StyledButton>
                <Button variant="outlined" onClick={handleLogout}>Wyloguj</Button>
            </StyledButton>
        </HeaderWrapper>
    );
};

export default Header;
