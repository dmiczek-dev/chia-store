import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Box } from '@material-ui/core';
import { LoginWrapper, LoginContainer, Heading, Form } from '../../styles/LoginStyle';

export default function Login() {
    const {
        login,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(
        { mode: 'onBlur' });
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
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
                            render={({ field }) => <TextField type="password" error={!!errors.password} autoComplete="off" helperText={!!errors.username ? 'Uzupełnij to pole' : ''} label="Hasło" {...field} />}
                        />
                    </Box>


                    <Button type="submit"
                        variant="contained" color="primary"
                        size="large">Zaloguj</Button>
                </Form>
            </LoginWrapper>
        </LoginContainer>
    );
}

