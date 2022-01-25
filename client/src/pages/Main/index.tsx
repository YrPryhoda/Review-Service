import React from 'react';
import {Box, Container, CssBaseline, Grid, ThemeProvider, Toolbar, Typography} from '@mui/material';
import {createTheme} from '@mui/material/styles';

import PagePagination from '../../components/PagePagination';
import {selectPlaces} from '../../features/places/selectors';
import QueryResult from '../../components/QueryResult';
import Spinner from '../../components/common/Spinner';
import PlacesList from '../../components/PlacesList';
import useLoadPlaces from './hooks/useLoadPlaces';
import {useAppSelector} from '../../store/hooks';
import Navbar from '../../components/Navbar';
import Appbar from '../../components/Appbar';
import styles from './styles.module.scss';

const mdTheme = createTheme();

const Main = () => {
    const {findQuery} = useAppSelector(selectPlaces);
    const {places, loading} = useLoadPlaces();
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const toggleDrawer = () => {
        setNavbarOpen(!navbarOpen);
    };

    const header = Object.values(findQuery).some(el => !!el.length)
        ? <QueryResult/>
        : <Typography variant={'h4'} align={'center'} sx={{mb: 3}}> Here is a few popular places for you</Typography>;

    const content = loading
        ? <Spinner/>
        : !places.length
            ? <Typography variant={'h3'}>List is Empty</Typography>
            : <>
                <PlacesList places={places}/>
                <Grid container item xs={12} className={styles.loadMoreBlock}>
                    <PagePagination/>
                </Grid>
            </>;

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <Appbar toggleDrawer={toggleDrawer} open={navbarOpen}/>
                <Navbar toggleDrawer={toggleDrawer} open={navbarOpen}/>
                <Box
                    component="main"
                    className={styles.contentBlock}
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900]
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        {header}
                        {content}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Main;
