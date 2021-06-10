import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from '../../styles/Register.module.scss';
import { useForm, Controller } from 'react-hook-form';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#28A745FF',
        },
    },
});

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

    const email = register('email', { required: true });

    return (
        <div className={styles.register}>
            <ThemeProvider theme={theme}>
                <div className={styles.register__wrapper}>
                    <h2 className={styles.register__heading}>Sign In</h2>
                    <form onSubmit={handleSubmit(onSubmit)}
                          className={styles.form}>
                        <Controller
                            name="MyCheckbox"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <TextField
                                id="standard-basic" label="Email"
                                size="normal" {...field} />}
                        />
                        {errors.email && <p>This is required</p>}

                        <Button className={styles.form__submit} type="submit"
                                variant="contained" color="primary"
                                size="large">LOG IN</Button>
                    </form>
                </div>
            </ThemeProvider>
        </div>
    );
}

