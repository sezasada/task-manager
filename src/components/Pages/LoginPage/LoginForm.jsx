import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Stack } from "@mui/system";

function LoginForm() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "8px",
        marginBottom: "10px",
      }}
      spacing={3}
    >
      <form onSubmit={login}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              borderBottom: "1px solid grey",
            }}
          >
            Login
          </Typography>
          {errors.loginMessage && (
            <Typography
              variant="h6"
              component="h3"
              className="alert"
              role="alert"
            >
              {errors.loginMessage}
            </Typography>
          )}
          <br />
          <Box>
            <TextField
              type="email"
              name="username"
              label="Email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#B5B292",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B5B292",
                  },
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "black",
                },
              }}
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Box>
          <br />
          <Box>
            <TextField
			    sx={{
					"& .MuiOutlinedInput-root": {
					  "& fieldset": {
						borderColor: "#B5B292",
					  },
					  "&.Mui-focused fieldset": {
						borderColor: "#B5B292",
					  },
					},
					"& .MuiFormLabel-root.Mui-focused": {
					  color: "black",
					},
				  }}
              type="password"
              name="password"
              label="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Box>
          <br />
          <Box>
            <Button
              variant="contained"
              type="submit"
              name="submit"
              value="Log In"
              sx={{
                color: "#F3ECE7",
                  backgroundColor: "#B5B292",
                  "&:hover": {
                    backgroundColor: "#B5B292",
                    transform: "scale(1.03)",
                  },
                width: 200,
              }}
            >
              Log In
            </Button>
          </Box>
          <br />
          <Button
            variant="contained"
            type="button"
            className="btn btn_sizeSm"
            onClick={() => {
              history.push("/request_reset");
            }}
            sx={{
				color: "#F3ECE7",
				backgroundColor: "#B5B292",
				"&:hover": {
				  backgroundColor: "#B5B292",
				  transform: "scale(1.03)",
				},
              width: 200,
            }}
          >
            Reset Password
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default LoginForm;
