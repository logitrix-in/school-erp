import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Button,
  Checkbox,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const context = useContext(AppContext);

  const [error, setError] = useState("");
  const naviagte = useNavigate()

  const login = () => {
    if (!formData.username.length > 3 && !formData.password.length > 2) return;

    axios
      .post(
        "https://api.sociolinq.com/login/",
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        context.setUser(res.data);
        naviagte('/dashboard/')
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main", m: 1 }}>
          <Icon icon="solar:user-broken" color="white" fontSize={"1.4rem"} />
        </Avatar>
        <Typography component="h1" variant="h4" fontWeight={400}>
          Sign In
        </Typography>
        <Box sx={{ mt: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            margin="normal"
            fullWidth
            name="username"
            label="Username"
            autoComplete="username"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={login}
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
