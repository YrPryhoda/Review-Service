import React from 'react';
import {Grid, Paper} from '@mui/material';

import {CommentInterface} from '../../../typedef';

import CreateEditComment from '../CreateEditComment';
import styles from './styles.module.scss';
import CommentView from './CommentView';

interface IProps {
    comment: CommentInterface;
    onCommentLike: (id: string) => void;
    onCommentEdit: (id: string | null) => void;
    editComment: string | null;
    onZoomedImgClose: () => void;
    onImageClick: (url: string) => void;
    zoomImg: string | null;
}

const Comment = (props: IProps) => {
    const {onCommentEdit, onCommentLike, editComment, comment, ...rest} = props;
    return (
        <Grid container item xs={12} mb={3}>
            <Paper elevation={2} className={styles.paper}>
                {
                    editComment === comment.id
                        ? <CreateEditComment comment={comment} onEditCancel={onCommentEdit}/>
                        : <CommentView
                            comment={comment}
                            onCommentLike={onCommentLike}
                            onCommentEdit={onCommentEdit}
                            {...rest}
                        />
                }
            </Paper>
        </Grid>
    );
};

export default Comment;
