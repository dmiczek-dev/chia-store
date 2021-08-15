import React, { useContext } from 'react';
import { HeaderWrapper, LogoWrapper, PageTitle, StyledButton, StyledLogo } from './Header.styles';
import { Button } from '@material-ui/core';
import { setAccessToken } from '../../utils/accessToken';
import { useRouter } from 'next/router';
import { useFetch } from '../../hooks/useFetch';
import { TitleContext } from '../../layout/Dashboard/Dashboard';

const Header = () => {
    const router = useRouter();
    const { fetchData } = useFetch(process.env.NEXT_PUBLIC_URL + 'logout', true);

    const handleLogout = async () => {
        await fetchData();
        setAccessToken();
        await router.push('/login');
    };
    const { title } = useContext(TitleContext);
    return (
        <HeaderWrapper>
            <LogoWrapper>
                <StyledLogo src="/img/chia-logov2.png" alt="Logo"/>
            </LogoWrapper>
            <PageTitle>
                {title}
            </PageTitle>
            <StyledButton>
                <Button variant="outlined" onClick={handleLogout}>Wyloguj</Button>
            </StyledButton>
        </HeaderWrapper>
    );
};

export default Header;
