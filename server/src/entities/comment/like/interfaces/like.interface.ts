import {CommentInterface} from '@entities/comment/interfaces/comment.interface';
import {UserInterface} from '@entities/user/interfaces/user.interface';

export interface CommentLikeRequest {
    commentId: string;
}

export interface CommentLikeInterface {
    id?: string;
    user: UserInterface;
    comment?: CommentInterface;
}
