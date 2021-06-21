import NextApp from 'next/app';
import React from 'react';
import '../public/fonts/fonts.css';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { GlobalStyle } from '../styles/GlobalStyle';

import { StylesProvider } from '@material-ui/core/styles';

const theme = {
    primary: '#f2f2f2',
    ...createMuiTheme({
        palette: {
            primary: {
                main: '#28A745FF',
            },
        },
    }),
};

export default function App ({ Component, pageProps }) {
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
