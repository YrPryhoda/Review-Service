import React, {ChangeEvent, useState} from 'react';
import {Typography, TextField, Button, Rating, Grid, IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {NotificationManager} from 'react-notifications';
import {styled} from '@mui/material/styles';

import {createComment, updateComment} from '../../features/places/comments/action-creators';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectPlaces} from '../../features/places/selectors';
import {stringValidator} from '../../helpers/validators';
import {selectUser} from '../../features/user/selectors';
import {CommentEditInterface} from '../../../typedef';
import useForm from '../common/hooks/useForm';
import useRating from './hooks/useRating';
import styles from './styles.module.scss';

interface IProps {
    comment?: CommentEditInterface;
    onEditCancel?: (id: string | null) => void;
}

const Input = styled('input')({
    display: 'none'
});

const CreateEditComment = ({comment, onEditCancel}: IProps) => {
    const {profile} = useAppSelector(selectUser);
    const {details} = useAppSelector(selectPlaces);
    const dispatch = useAppDispatch();
    const {rating, onRatingChange} = useRating(comment?.rating);
    const [images, setImages] = useState<FileList | null | []>([]);
    const {form, onChange, clearForm} = useForm({
        title: comment?.title || '',
        content: comment?.content || ''
    });

    const handlerCancelEdit = () => onEditCancel!(null);
    const handlerSubmit = () => {
        if (!stringValidator(form.title) || !stringValidator(form.content) || !rating) {
            return NotificationManager.warning('Please fill in all fields', 'Warning', 3500);
        }

        if (comment) {
            dispatch(updateComment({...form, id: comment.id, rating}));
            return handlerCancelEdit();
        }

        dispatch(createComment({...form, userId: profile.id, placeId: details.id, rating, images}));
        clearForm();
        setImages([]);
    };

    const editCancel = comment && (
        <Grid item xs={1} className={styles.cancelBtn}>
            <IconButton
                onClick={handlerCancelEdit}
                component="span"
                color="error"
            >
                <HighlightOffIcon/>
            </IconButton>
        </Grid>
    );

    const handlerImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files;
        if (files && files.length > 5) {
            setImages([]);
            return NotificationManager.info('You can load up to 5 photos', 'Info', 800);
        }
        setImages(files);
    };

    const imagesBlock = images && images.length > 0 && (
        <Grid container item xs={12}>
            {[...images].map(image => (
                <img className={styles.img} key={image.name} src={URL.createObjectURL(image)} alt="image"/>
            ))}
            <Button onClick={() => setImages([])} color="error">
                Delete all
            </Button>
        </Grid>
    );

    return (
        <Grid container item xs={12}>
            <Grid container mb={2} className={styles.header}>
                <Grid container item xs={11}>
                    <Rating
                        onChange={(event, newValue) => onRatingChange(newValue!)}
                        name="simple-controlled"
                        value={rating}
                        size={'large'}
                        sx={{mb: 1}}
                    />
                    <Typography ml={3} variant={'h6'}>
                        {rating && `Current rating is: ${rating}/5`}
                    </Typography>
                </Grid>
                {editCancel}
            </Grid>

            <TextField
                className={styles.commentInput}
                placeholder={'Add short title'}
                onChange={onChange}
                value={form.title}
                name={'title'}
                sx={{mb: 2}}
                fullWidth
            />

            <TextField
                placeholder={'Share with us your opinion'}
                className={styles.commentInput}
                value={form.content}
                onChange={onChange}
                name={'content'}
                minRows={8}
                fullWidth
                multiline
            />
            <div className={`${styles.btnWrapper} ${comment && styles.editWrap}`}>
                {!comment && <label htmlFor="contained-button-file">
                    <Input
                        onChange={handlerImagesChange}
                        id="contained-button-file"
                        accept="image/*"
                        type="file"
                        multiple
                    />
                    <Button
                        startIcon={<PhotoCamera/>}
                        variant="contained"
                        component="span"
                        size="large"
                    >
                        Upload (5 max)
                    </Button>
                </label>}
                <div>
                    <Button
                        onClick={() => clearForm()}
                        variant="outlined"
                        color="error"
                        size="large"
                        sx={{mr: 4}}
                    >
                        Clear
                    </Button>

                    <Button
                        onClick={handlerSubmit}
                        variant="contained"
                        size="large"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
            {imagesBlock}
        </Grid>
    );
};

export default CreateEditComment;
