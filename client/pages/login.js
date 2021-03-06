import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Box, Link } from "@material-ui/core";
import { LoginWrapper, LoginContainer, Heading, Form } from "../styles/Login.styles";
import { useRouter } from "next/router";
import { setAccessToken, setUserRole } from "../utils/accessToken";

const Login = () => {
  //TODO Refactor
  const {
    login,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const url = process.env.NEXT_PUBLIC_URL + "login";
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ username: data.username, password: data.password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setUserRole(data.role);
        router.push("/app");
      } else {
        console.log("Login failed.");
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error("You have an error in your code or there are Network issues.", error);

      const { response } = error;
      alert("Error: wrong username or password");
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <Heading>Logowanie</Heading>
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
                  helperText={!!errors.username ? "Uzupe??nij to pole" : ""}
                  label="Nazwa u??ytkownika"
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
                  autoComplete="off"
                  helperText={!!errors.username ? "Uzupe??nij to pole" : ""}
                  label="Has??o"
                  {...field}
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Zaloguj
            </Button>
          </Box>
          <Box mb={1}>
            <Link href="/register">Rejestracja</Link>
          </Box>
          <Box mb={1}>
            <Link href="/reset-password">Zapomnia??em has??a</Link>
          </Box>
        </Form>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
