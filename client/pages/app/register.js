import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Box } from '@material-ui/core';
import { RegisterWrapper, RegisterContainer, Heading, Form } from '../../styles/RegisterStyle';

export default function Register () {
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
                <Heading>Sign In</Heading>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Box mb={2}>
                        <Controller
                            name="registerEmail"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) =>
                                <TextField error={!!errors.registerEmail} helperText={!!errors.registerEmail ? 'Dupa' : ''}
                                           label="Email" {...field} />}
                        />
                    </Box>
                    <Box mb={4}>
                        <Controller
                            name="registerPassword"
                            control={control}
                            defaultValue=""
                            error={errors.registerPassword}
                            helperText="Required field"
                            rules={{ required: true }}
                            render={({ field }) => <TextField error={!!errors.registerPassword} helperText="Dupa" label="Password" {...field} />}
                        />
                    </Box>


                    <Button type="submit"
                            variant="contained" color="primary"
                            size="large">LOG IN</Button>
                </Form>
            </RegisterWrapper>
        </RegisterContainer>
    );
}

