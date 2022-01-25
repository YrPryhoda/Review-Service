import React, {useState} from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Button, Grid, Rating, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {dateTimeFormatter} from '../../helpers/dateFormatter';
import {selectUser} from '../../features/user/selectors';
import {CommentInterface} from '../../../typedef';

import {removeComment} from '../../features/places/comments/action-creators';
import DeleteCommentModal from '../DeleteCommentModal';
import Reaction from '../common/Reaction';
import styles from './styles.module.scss';
import ZoomedImage from '../ZoomedImage';
import ImagesList from '../ImagesList';

interface IProps {
    comment: CommentInterface;
    onCommentLike: (id: string) => void;
    onCommentEdit: (id: string) => void;
    onZoomedImgClose: () => void;
    onImageClick: (url: string) => void;
    zoomImg: string | null;
}

const CommentView = ({comment, onCommentEdit, onCommentLike, onZoomedImgClose, zoomImg, onImageClick}: IProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const {profile} = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const handlerModalOpen = () => setModalOpen(prevState => !prevState);
    const handlerDeleteCommentConfirm = () => dispatch(removeComment(comment.id));

    const editBtn = profile?.id === comment.user.id && (
        <Button
            onClick={() => onCommentEdit(comment.id)}
            className={styles.editBtn}
            startIcon={<EditIcon/>}
            variant="outlined"
            size="small"
        >
            Edit
        </Button>
    );

    const deleteBtn = profile?.id === comment.user.id && (
        <Button
            onClick={handlerModalOpen}
            className={styles.deleteBtn}
            startIcon={<DeleteOutlineIcon/>}
            color="error"
            variant="outlined"
            size="small"
        >
            Remove
        </Button>
    );

    const imagesBlock = comment.images?.length ? <ImagesList urls={comment.images} onClick={onImageClick}/> : null;
    const zoomImageBlock = zoomImg && <ZoomedImage zoomImg={zoomImg} onClose={onZoomedImgClose}/>;

    return (
        <>
            <Grid container mb={2} justifyContent={'space-between'}>
                <Rating
                    name="simple-controlled"
                    value={comment.rating}
                    size={'large'}
                    readOnly
                />
                <Grid container xs={12} md={7} item className={styles.authorBlock} wrap="wrap">
                    {editBtn}
                    {deleteBtn}
                    <Typography variant={'h6'}>
                        {`${comment.user.firstName} ${comment.user.lastName}`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        {comment.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} className={styles.commentContent}>
                    {comment.content}
                </Grid>
                {imagesBlock}
                <Grid container item xs={12} className={styles.commentFooter}>
                    <Grid item md={6} xs={12}>
                        <Reaction likes={comment.likes} onClick={() => onCommentLike(comment.id)}/>
                    </Grid>
                    <Grid item md={6} xs={12} className={styles.footerItem}>
                        <p className={styles.commentDate}>
                            {dateTimeFormatter(comment.createdAt!)}
                        </p>
                    </Grid>
                </Grid>
            </Grid>
            <DeleteCommentModal open={modalOpen} toggleOpen={handlerModalOpen} onConfirm={handlerDeleteCommentConfirm}/>
            {zoomImageBlock}
        </>
    );
};

export default CommentView;
