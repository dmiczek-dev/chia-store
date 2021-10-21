import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Box, Link } from "@material-ui/core";
import { ResetPasswordWrapper, ResetPasswordContainer, Heading, Form } from "../styles/ResetPassword.styles";
import { useRouter } from "next/router";
import { RegisterContainer, RegisterWrapper } from "../styles/Register.styles";

const url = process.env.NEXT_PUBLIC_URL + "reset-password";

const ResetPassword = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ email: data.email }),
      });
      if (response.status === 200) {
        const data = await response.json();
        reset();
        console.dir(data);
      } else {
        console.log("Register failed.");
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error("You have an error in your code or there are Network issues.", error);
      const { response } = error;
      alert("Error occur!");
    }
  };

  return (
    <RegisterContainer>
      <RegisterWrapper>
        <Heading>Nowe hasło</Heading>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3} width={220}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  error={!!errors.email}
                  helperText={!!errors.email ? "Uzupełnuj to pole" : ""}
                  label="Email"
                  {...field}
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Wyślij
            </Button>
          </Box>
        </Form>
      </RegisterWrapper>
    </RegisterContainer>
  );
};

export default ResetPassword;
