import {CommentInterface} from '@entities/comment/interfaces/comment.interface';

export interface FileInterface {
    id: number;
    url: string;
    comment: CommentInterface;
    createdAt: Date;
}

export interface FileInputInterface {
    url: string;
    comment: CommentInterface;
}
