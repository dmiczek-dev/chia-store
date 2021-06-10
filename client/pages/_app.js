import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../public/fonts/fonts.css';
import { GlobalStyle } from '../styles/GlobalStyle';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#28A745FF',
        },
    },
});

export default function App ({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle/>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
