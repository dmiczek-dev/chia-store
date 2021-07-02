import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Box } from '@material-ui/core';
import { LoginWrapper, LoginContainer, Heading, Form } from '../styles/Login.styles';

const Login = () => {
    const {
        login,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(
        { mode: 'onBlur' });

    const url = 'http://localhost:3001/login';

    const onSubmit = async (data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                },
                body: JSON.stringify({ username: data.username, password: data.password }),
            });
            if (response.status === 200) {
                alert('Loged in a');
                const data = await response.json();
                console.dir(data)
                // await login({ jwt_token, jwt_token_expiry });
            } else {
                console.log('Login failed.');
                // https://github.com/developit/unfetch#caveats
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        } catch (error) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error,
            );

            const { response } = error;
            alert('Error aa');
        }
    };

    return (
        <LoginContainer>
            <LoginWrapper>
                <Heading>Logowanie</Heading>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Box mb={2}>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) =>
                                <TextField error={!!errors.username} autoComplete="off" helperText={!!errors.username ? 'Uzupełnij to pole' : ''}
                                           label="Nazwa użytkownika" {...field} />}
                        />
                    </Box>
                    <Box mb={4}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <TextField type="password" error={!!errors.password} autoComplete="off"
                                                              helperText={!!errors.username ? 'Uzupełnij to pole' : ''} label="Hasło" {...field} />}
                        />
                    </Box>
                    <Button type="submit"
                            variant="contained" color="primary"
                            size="large">Zaloguj</Button>
                </Form>
            </LoginWrapper>
        </LoginContainer>
    );
};

export default Login;
