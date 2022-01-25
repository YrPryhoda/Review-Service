import React from 'react';
import {Avatar, CssBaseline, Paper, Box, Grid, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import LoginForm from '../../components/LoginForm';
import styles from './login.module.scss';
import img from './assets/city.jpg';

const theme = createTheme();

const Login = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    className={styles.bg_xs}
                    item
                    xs={false}
                    md={7}
                    sx={{backgroundImage: `url(${img})`}}
                />
                <Grid item container className={styles.loginWrapper} xs={12} sm={12} md={5} component={Paper}
                      elevation={6} square>
                    <Box className={styles.loginForm}>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <LoginForm/>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Login;
