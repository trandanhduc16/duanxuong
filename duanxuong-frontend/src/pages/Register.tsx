import { Box, Button, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "src/components/elements/InputText";
import { MIN_PASSWORD } from "src/consts";
import isEmail from "validator/lib/isEmail";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const nav = useNavigate();
  const validate = (values: RegisterFormParams) => {
    const { username, email, password } = values;
    const errors: ValidationErrors = {};
    if (!username) errors.username = "Can nhap username vao";
    if (!email) errors.email = "Can nhap email vao";
    if (email && !isEmail(email)) errors.email = "Chua dung dinh dang email";
    if (!password) errors.password = "Can nhap password vao";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Can nhap password toi thieu ${MIN_PASSWORD} ky tu`;
    return errors;
  };

  const onSubmit = async (data: RegisterFormParams) => {
    try {
      await axios.post("/auth/register", data);
      nav("/login");
    } catch (error) { }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Register
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Field
                name="username"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label="Username"
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="email"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label="Email"
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label="Password"
                    messageError={meta.touched && meta.error}
                    type="password"
                  />
                )}
              />
              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  Do you have an account?{' '}
                  <Typography component="a" href="/login" sx={{ ml: 1, textDecoration: 'underline' }}>
                    Login
                  </Typography>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <Button
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  fullWidth
                  sx={{ textTransform: 'none' }}
                  color="primary"
                >
                  Facebook
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  fullWidth
                  sx={{ textTransform: 'none' }}
                  color="primary"
                >
                  Google
                </Button>
              </Box>

            </Stack>
          </form>
        )}
      />
    </Container>
  );
};

export default Register;
