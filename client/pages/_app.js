import NextApp from 'next/app';
import React, { useState } from 'react';
import '../public/fonts/fonts.css';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialThemeProvider, createTheme  } from '@material-ui/core/styles';
import { GlobalStyle } from '../styles/GlobalStyle';
import { StylesProvider } from '@material-ui/core/styles';
import Dashboard from '../layout/Dashboard/Dashboard';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr'

const theme = {
    primary: '#f2f2f2',
    ...createTheme ({
        palette: {
            primary: {
                main: '#28A745FF',
            },
        },
    }),
};

export default function App ({ Component, pageProps }) {
    const router = useRouter();
    const swrOptions = {
        fetcher: (url, token) => fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        }).then(res => res.json())
    }
    const [pageTitle, setPageTitle] = useState('')

    if (router.pathname.startsWith('/app')) {
        return (
            <>
                <GlobalStyle/>
                <StylesProvider injectFirst>
                    <StyledThemeProvider theme={theme}>
                        <MaterialThemeProvider theme={theme}>
                            <SWRConfig value={swrOptions}>
                                <Dashboard pageTitle={pageTitle}>
                                    <Component setPageTitle={setPageTitle} {...pageProps} />
                                </Dashboard>
                            </SWRConfig>
                        </MaterialThemeProvider>
                    </StyledThemeProvider>
                </StylesProvider>

            </>
        );
    }
    return (
        <>
            <GlobalStyle/>
            <StylesProvider injectFirst>
                <StyledThemeProvider theme={theme}>
                    <MaterialThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </MaterialThemeProvider>
                </StyledThemeProvider>
            </StylesProvider>

        </>
    );
}
