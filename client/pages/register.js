import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Box, Link } from "@material-ui/core";
import { RegisterWrapper, RegisterContainer, Heading, Form } from "../styles/Register.styles";
import { useRouter } from "next/router";

const url = process.env.NEXT_PUBLIC_URL + "register";

//TODO refactor
const Register = () => {
  const {
    register,
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
        body: JSON.stringify({ username: data.username, password: data.password, email: data.email }),
      });
      if (response.status === 200) {
        const data = await response.json();
        console.dir(data);
        router.push("/login");
      } else {
        console.log("Register failed.");
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error("You have an error in your code or there are Network issues.", error);
      const { response } = error;
      alert("Error during registration process");
    }
  };

  return (
    <RegisterContainer>
      <RegisterWrapper>
        <Heading>Rejestracja</Heading>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2} width={220}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  error={!!errors.username}
                  autoComplete="off"
                  helperText={!!errors.username ? "Uzupełnij to pole" : ""}
                  label="Nazwa użytkownika"
                  {...field}
                />
              )}
            />
          </Box>
          <Box mb={2} width={220}>
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
          <Box mb={4} width={220}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="password"
                  error={!!errors.password}
                  helperText={!!errors.password ? "Uzupełnuj to pole" : ""}
                  label="Hasło"
                  {...field}
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Zarejestruj
            </Button>
          </Box>
          <Box mb={1}>
            <Link href="/login">Logowanie</Link>
          </Box>
        </Form>
      </RegisterWrapper>
    </RegisterContainer>
  );
};

export default Register;
