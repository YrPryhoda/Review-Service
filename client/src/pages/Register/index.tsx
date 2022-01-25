import React from 'react';
import {Avatar, CssBaseline, Paper, Box, Grid, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import RegisterForm from '../../components/RegisterForm';
import styles from './register.module.scss';
import img from './assets/register.jpg';

const theme = createTheme();

const Register = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    sx={{backgroundImage: `url(${img})`}}
                    className={styles.bg_xs}
                    xs={false}
                    md={7}
                    item
                />
                <Grid
                    className={styles.loginWrapper}
                    component={Paper}
                    elevation={6}
                    container
                    xs={12}
                    md={5}
                    square
                    item
                >
                    <Box className={styles.loginForm}>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <RegisterForm/>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Register;
