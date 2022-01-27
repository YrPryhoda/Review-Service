import React, {useMemo, useState} from 'react';

import {Navigate, NavLink, useParams} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import {HashLink} from 'react-router-hash-link';
import {ArrowBack} from '@mui/icons-material';
import {
    ThemeProvider, createTheme, CssBaseline, Typography, Container, ListItem, Rating, Paper, List, Grid, Box, Button
} from '@mui/material';

import CreateEditComment from '../../components/CreateEditComment';
import PlaceDetailsBlock from '../../components/PlaceDetailsBlock';
import {calcAverageRating} from '../../helpers/calcAverageRating';
import CardGeolocation from '../../components/CardGeolocation';
import PlaceCategories from '../../components/PlaceCategories';
import CommentAlert from '../../components/CommentAlert';
import CommentsList from '../../components/CommentsList';
import Reaction from '../../components/common/Reaction';
import Spinner from '../../components/common/Spinner';
import FlexItem from '../../components/FlexItem';

import {createCommentLike, createPlaceLike} from '../../features/places/like/action-creators';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectUser} from '../../features/user/selectors';
import useFindById from './hooks/useFindById';
import {routes} from '../../routes/routes';

import PlaceDetailsImages from '../../components/PlaceDetailsImages';
import PlaceChangesForm from '../../components/PlaceChangesForm';
import ModalWindow from '../../components/ModalWindow';
import styles from './styles.module.scss';

const theme = createTheme();

const PlaceDetails = () => {
    const {placeId} = useParams();
    const {loading, details, error} = useFindById(placeId!);
    const {profile, access_token} = useAppSelector(selectUser);
    const [modalChanges, setModalChanges] = useState(false);
    const dispatch = useAppDispatch();
    const avgRating = useMemo(() => calcAverageRating(details.comments || []), [details.comments]);
    const [zoomImg, setZoomImg] = useState<string | null>(null);
    const handlerImageClick = (url: string) => setZoomImg(url);
    const handlerZoomImageClose = () => setZoomImg(null);
    const toggleModalOpen = () => setModalChanges(prev => !prev);
    const unAuthWarning = () => NotificationManager.warning(
        'Only authorized users can leave reaction',
        'Info',
        700
    );
    const conflictWarning = () => NotificationManager.info(
        'You have already liked it',
        'Info',
        700
    );

    const handlerPlaceLike = () => {
        if (!access_token) {
            return unAuthWarning();
        }

        const isLiked = details.likes?.length && details.likes.find(el => el.user.id === profile.id);
        if (isLiked) {
            return conflictWarning();
        }
        dispatch(createPlaceLike({placeId: details.id}));
    };

    const handlerCommentLike = (id: string) => {
        if (!access_token) {
            return unAuthWarning();
        }
        const comment = details.comments?.length && details.comments.find(comment => comment.id === id);

        if (comment) {
            const isLiked = comment.likes.length && comment.likes.find(like => like.user.id === profile.id);
            if (isLiked) {
                return conflictWarning();
            }
        }
        dispatch(createCommentLike({commentId: id}));
    };

    if (loading) {
        return <Spinner/>;
    }

    if (error.message) {
        NotificationManager.error('Not Found', 'Error', 3000);
        return <Navigate to={routes.home}/>;
    }

    const createCommentBlock = access_token && profile.id ? <CreateEditComment/> : <CommentAlert/>;
    const reviewsCount = details.comments?.length || 0;
    const detailsImages = details.comments?.length
        ? <Grid container sx={{mt: 2}} className={styles.paper}>
            <PlaceDetailsImages comments={details.comments} onClick={handlerImageClick}/>
        </Grid>
        : null;

    const requestChangesBtn = !details.placeSource
        ? <Grid container sx={{mt: 2}} className={styles.paper}>
            <Typography variant="h6">
                If you want add some information, you might
            </Typography>
            <Button onClick={toggleModalOpen}>
                Request changes
            </Button>
        </Grid>
        : null;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Grid item xs={12} mt={2}>
                    <NavLink to={routes.home}>
                        <Button startIcon={<ArrowBack/>} size={'large'}>Go Back</Button>
                    </NavLink>
                </Grid>

                <Grid container sx={{mt: 2}} className={styles.paper}>
                    <Grid item xs={12}>
                        <Typography variant={'h3'}> {details.name}</Typography>
                    </Grid>

                    <Grid container item xs={12} gap={1}>
                        <Grid item container alignItems={'center'} gap={2}>
                            <Rating name="half-rating-read"
                                    size="large"
                                    value={avgRating}
                                    precision={0.2}
                                    readOnly
                            />
                            <Typography component="div" className={styles.navigation}>
                                <HashLink smooth to={'#reviews'}>
                                    {`${reviewsCount} review(s)`}
                                </HashLink>
                            </Typography>
                        </Grid>

                        <Typography variant="subtitle1" component="span" justifySelf={'self-end'}>
                            {details.addressLine2}
                        </Typography>
                    </Grid>
                </Grid>

                <Paper className={styles.geoWrapper}>
                    <Grid container>
                        <Grid item xs={12}>
                            <CardGeolocation
                                lat={details.lat || 0}
                                lon={details.lon || 0}
                                name={details.name}
                                height={350}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {detailsImages}

                <Grid container sx={{mt: 5, justifyContent: 'space-between'}} gap={3}>
                    <Grid item xs={12} lg={5.7} className={styles.paper}>
                        <Typography variant="h5">
                            Reviews and rating
                        </Typography>
                        <Box sx={{flexDirection: 'column'}}>
                            <FlexItem>
                                <Rating name="half-rating-read"
                                        size="large"
                                        value={avgRating}
                                        precision={0.2}
                                        readOnly
                                />
                            </FlexItem>
                            <FlexItem>
                                <HashLink smooth to={'#reviews'}>
                                    <em>{`${reviewsCount} user(s) left commentaries below`} </em>
                                </HashLink>
                            </FlexItem>
                            <FlexItem>
                                <Reaction likes={details.likes || []} onClick={handlerPlaceLike}/>
                            </FlexItem>
                            <FlexItem>
                                <FlexItem>
                                    <List sx={{width: '100%'}} component="nav">
                                        <ListItem disablePadding>Categories:</ListItem>
                                        <PlaceCategories categories={details.categories}/>
                                    </List>
                                </FlexItem>
                            </FlexItem>
                        </Box>

                    </Grid>
                    <Grid item xs={12} lg={5.7} className={styles.paper}>
                        <Typography variant="h5">
                            Detail information
                        </Typography>
                        <PlaceDetailsBlock place={details}/>
                    </Grid>
                </Grid>

                {requestChangesBtn}

                <Grid container sx={{mt: 2}} className={styles.paper}>
                    <Grid item mb={4}>
                        <Typography variant="h5" id={'reviews'}>
                            Create comment
                        </Typography>
                    </Grid>
                    {createCommentBlock}
                </Grid>

                <Grid container sx={{mt: 2}} className={styles.paper}>
                    <CommentsList
                        onZoomedImgClose={handlerZoomImageClose}
                        onCommentLike={handlerCommentLike}
                        comments={details.comments || []}
                        onImageClick={handlerImageClick}
                        zoomImg={zoomImg}
                    />
                </Grid>
            </Container>
            <ModalWindow open={modalChanges} toggleOpen={toggleModalOpen}>
                <PlaceChangesForm place={details} onClose={toggleModalOpen}/>
            </ModalWindow>
        </ThemeProvider>
    );
};

export default PlaceDetails;
