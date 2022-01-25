import {CommentLike} from '@entities/comment/like/comment.like.entity';
import {PlaceLike} from '@entities/place/like/place.like.entity';
import {Comment} from '@entities/comment/comment.entity';
import {Place} from '@entities/place/place.entity';

export enum EmailStatus {
    Pending,
    Cinfirm
}

export interface UserInterface {
    id?: string;
    firstName: string;
    lastName: string;
    comments?: Comment[];
    email: string;
    password?: string;
    token?: string;
    posts?: Place[];
    emailStatus?: EmailStatus;
    signupConfirmId?: string;
    commentsLikes?: CommentLike[];
    placesLikes?: PlaceLike[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt?: Date;
}
