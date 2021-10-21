import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Box, Link } from "@material-ui/core";
import { RegisterWrapper, RegisterContainer, Heading, Form } from "../styles/Register.styles";
import { useRouter } from "next/router";

const url = process.env.NEXT_PUBLIC_URL + "new-password";

//TODO refactor, fix after field reset change from controlled to uncontrolled
const NewPassword = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ token: router.query.token, password: data.password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        console.dir(data);
        router.push("/login");
      } else {
        console.log("Password failed");
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
          <Box mb={2} width={220}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  error={!!errors.email}
                  helperText={!!errors.email ? "Uzupełnuj to pole" : ""}
                  label="Hasło"
                  {...field}
                  type="password"
                />
              )}
            />
          </Box>
          <Box mb={2} width={220}>
            <Controller
              name="password_check"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  error={!!errors.email}
                  helperText={!!errors.email ? "Uzupełnuj to pole" : ""}
                  label="Powtórz hasło"
                  {...field}
                  type="password"
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

export default NewPassword;
