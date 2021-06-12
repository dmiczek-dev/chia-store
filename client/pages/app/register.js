import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Box } from '@material-ui/core';
import { RegisterWrapper, RegisterContainer, Heading, Form } from '../../styles/Register.styles';

const Register = () => {
    const {
        register,
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
        <RegisterContainer>
            <RegisterWrapper>
                <Heading>Rejestracja</Heading>
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
                    <Box mb={2}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) =>
                                <TextField error={!!errors.email} helperText={!!errors.email ? 'Uzupełnuj to pole' : ''}
                                           label="Email" {...field} />}
                        />
                    </Box>
                    <Box mb={4}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <TextField type="password" error={!!errors.password}
                                                              helperText={!!errors.password ? 'Uzupełnuj to pole' : ''} label="Hasło" {...field} />}
                        />
                    </Box>

                    <Button type="submit"
                            variant="contained" color="primary"
                            size="large">Zarejestruj</Button>
                </Form>
            </RegisterWrapper>
        </RegisterContainer>
    );
};

export default Register;

