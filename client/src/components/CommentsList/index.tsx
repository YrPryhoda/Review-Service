import React, {useState} from 'react';
import {Divider, Grid, Typography} from '@mui/material';

import {selectPlaces} from '../../features/places/selectors';
import {CommentInterface} from '../../../typedef';
import {useAppSelector} from '../../store/hooks';

import Spinner from '../common/Spinner';
import Comment from '../Comment';

interface IProps {
    comments: CommentInterface[];
    onCommentLike: (id: string) => void;
    onZoomedImgClose: () => void;
    onImageClick: (url: string) => void;
    zoomImg: string | null;
}

const CommentsList = ({onCommentLike, onZoomedImgClose, onImageClick, zoomImg, comments = []}: IProps) => {
    const {loading} = useAppSelector(selectPlaces);
    const [editComment, setEditComment] = useState<string | null>(null);
    const handlerCommentEdit = (id: string | null) => {
        setEditComment(id);
    };
    return comments.length
        ? (
            <Grid container item xs={12} mt={3}>
                <Grid item xs={12} mb={5}>
                    <Divider><h2>Users commentaries</h2></Divider>
                </Grid>

                {loading
                    ? <Spinner/>
                    : comments.map(comment => <Comment
                        onZoomedImgClose={onZoomedImgClose}
                        onImageClick={onImageClick}
                        zoomImg={zoomImg}
                        onCommentLike={onCommentLike}
                        onCommentEdit={handlerCommentEdit}
                        editComment={editComment}
                        comment={comment}
                        key={comment.id}
                    />)}
            </Grid>
        )
        : (
            <Grid
                sx={{minHeight: '150px'}}
                justifyContent="center"
                alignItems="center"
                container
                xs={12}
                mt={5}
                item
            >
                <Typography
                    align={'center'}
                    variant={'h4'}
                >
                    {loading ? <Spinner/> : 'Users have not left their commentaries yet'}
                </Typography>
            </Grid>
        );
};

export default CommentsList;
