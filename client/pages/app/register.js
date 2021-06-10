import React from 'react';
import { Button, TextField, Box } from '@material-ui/core';
import { RegisterWrapper, RegisterContainer, Heading, Form } from '../../styles/RegisterStyle';
import { useForm, Controller } from 'react-hook-form';

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
                            name="MyCheckbox"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <TextField label="Email" {...field} />}
                        />
                        {errors.email && <p>This is required</p>}
                    </Box>
                    <Box mb={4}>
                        <Controller
                            name="MyCheckbox"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <TextField label="Password" {...field} />}
                        />
                        {errors.email && <p>This is required</p>}
                    </Box>


                    <Button type="submit"
                            variant="contained" color="primary"
                            size="large">LOG IN</Button>
                </Form>
            </RegisterWrapper>
        </RegisterContainer>
    );
}

