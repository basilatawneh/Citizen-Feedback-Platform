import * as React from 'react';
import classes from './login.module.scss';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useAppDispatch } from '../../app/hooks';
import { userAction } from '../../store/user.slice';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

interface IProps { }

const theme = createTheme();

const Login = (props: IProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            username: data.get('username'),
            password: data.get('password'),
        };

        try {
            const res = await axios.post(`${process.env.REACT_APP_ENDPOINT}/user/login`, body)
            if (res.status === 200) {
                dispatch(userAction.setUserData(res.data))
                toast.success("You are Login successfully");
                navigate("/home");
            }
        } catch (err) {
            toast.error("failed");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login to Citizen Feedback Platform
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;