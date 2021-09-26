import React, {useContext, useEffect, useState} from 'react';
import {TitleContext} from '../../layout/Dashboard/Dashboard';
import {useFetch} from '../../hooks/useFetch';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Button, Card, Collapse, Snackbar, TextField} from '@material-ui/core';
import styled from 'styled-components';
import {Controller, useForm} from 'react-hook-form';
import {Form} from '../../styles/Login.styles';
import {Alert} from "@material-ui/lab";
import {getAccessToken} from "../../utils/accessToken";

const StyledList = styled(List)`
  font-size: 4rem;
`;

const StyledCard = styled(Card)`
  margin: 0 auto;
  max-width: 450px;
`
const StyledListItemText = styled(ListItemText)`
  span {
    font-size: 1.6rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

const StyledButton = styled(Button)`
  margin-left: .6rem;
  font-size: 1.2rem;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const encode = data => {
    return Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
};

export default function Settings() {
    const {setTitle} = useContext(TitleContext);
    useEffect(() => {
        setTitle('Ustawienia');
    }, []);

    const [openEmail, setOpenEmail] = useState(false);
    const [openPass, setOpenPass] = useState(false);
    const [notify, setNotify] = useState({open: false, error: false});

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({open: false, error: false});
    };

    const url = process.env.NEXT_PUBLIC_URL + 'user';
    const {data, states, compareState, fetchData} = useFetch(url, true, null, {method: 'GET'}, true);

    const {
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm(
        {mode: 'onBlur', defaultValues: {email: ''}});
    const {
        handleSubmit: handleSubmitPass,
        control: controlPass,
        reset: resetPass,
        formState: {errors: errorsPass},
    } = useForm(
        {mode: 'onBlur', defaultValues: {password: ''}});

    const changeEmailUrl = process.env.NEXT_PUBLIC_URL + 'change-email'
    const changePassUrl = process.env.NEXT_PUBLIC_URL + 'change-password'
    const onSubmit = async (data, url, isEmail) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken(),
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache',
                },
                body: encode(data),
            });
            if (response.status === 200) {
                setNotify({open: true, error: false});
                fetchData();
                if(isEmail) {
                    reset();
                    setOpenEmail(false)
                } else {
                    resetPass();
                    setOpenPass(false)
                }
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        } catch (error) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error,
            );
            setNotify(prev => {
                return {...prev, open: false}
            });
        }
    };


    return (
        <StyledCard>
            {data ? (
                <StyledList>
                    <ListItem>
                        <StyledListItemText primary={data[0].username} secondary="Nazwa użytkownika"/>
                    </ListItem>
                    <Divider component="li"/>
                    <ListItem>
                        <StyledListItemText primary={data[0].email} secondary="Email"/>
                        <StyledButton variant="outlined" onClick={() => {
                            setOpenEmail(prev => !prev)
                        }}>Zmień</StyledButton>
                    </ListItem>
                    <Collapse in={openEmail} timeout="auto" unmountOnExit>
                        <Divider component="li"/>
                        <ListItem>
                            <StyledForm onSubmit={handleSubmit(data => onSubmit(data, changeEmailUrl, true))}>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{required: true}}
                                    render={({field}) =>
                                        <TextField error={!!errors.email} autoComplete="off"
                                                   helperText={!!errors.email ? 'Uzupełnij to pole' : ''}
                                                   label="Nowy adres email" {...field} />}
                                />
                                <Button type="submit" variant="contained" color="primary">ZAPISZ</Button>
                            </StyledForm>
                        </ListItem>
                    </Collapse>
                    <Divider component="li"/>
                    <ListItem>
                        <StyledListItemText primary="Hasło"/>
                        <StyledButton variant="outlined" onClick={() => {
                            setOpenPass(prev => !prev)
                        }}>Zmień</StyledButton>
                    </ListItem>
                    <Collapse in={openPass} timeout="auto" unmountOnExit>
                        <Divider component="li"/>
                        <ListItem>
                            <StyledForm onSubmit={handleSubmitPass(data => onSubmit(data, changePassUrl, false))}>
                                <Controller
                                    name="password"
                                    control={controlPass}
                                    rules={{required: true}}
                                    render={({field}) =>
                                        <TextField error={!!errorsPass.password} autoComplete="off"
                                                   helperText={!!errorsPass.password ? 'Uzupełnij to pole' : ''}
                                                   type="password"
                                                   label="Nowe hasło" {...field} />}
                                />
                                <Button type="submit" variant="contained" color="primary">ZAPISZ</Button>
                            </StyledForm>
                        </ListItem>
                    </Collapse>
                    <Snackbar open={notify.open} autoHideDuration={6000} onClose={handleClose}>
                        {notify.error ?
                            <Alert onClose={handleClose} severity="error">
                                Wystąpił błąd, spróbuj ponownie później
                            </Alert>
                            :
                            <Alert onClose={handleClose} severity="success">
                                Operacja zkończona skucesem
                            </Alert>
                        }

                    </Snackbar>
                </StyledList>
            ) : ''
            } </StyledCard>);

}
