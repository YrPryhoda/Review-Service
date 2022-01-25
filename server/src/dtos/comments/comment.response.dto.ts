import {CommentLikeInterface} from '@entities/comment/like/interfaces/like.interface';
import {CommentInterface} from '@entities/comment/interfaces/comment.interface';
import {FileInterface} from '@entities/comment/file/interfaces/file.interface';
import {CommentLikeResponseDto} from '@dtos/comments/like/like.response.dto';
import {UsersResponseDto} from '@dtos/users';

export class CommentResponseDto {
    readonly id: number;
    readonly user: UsersResponseDto;
    readonly title: string;
    readonly content: string;
    readonly rating: number;
    readonly createdAt: Date;
    readonly likes: CommentLikeInterface[] | [];
    readonly images: FileInterface[] | [];

    constructor(comment: CommentInterface) {
        this.id = comment.id;
        this.user = new UsersResponseDto(comment.user);
        this.title = comment.title;
        this.content = comment.content;
        this.rating = comment.rating;
        this.likes = comment.likes?.length ? comment.likes.map(like => new CommentLikeResponseDto(like)) : [];
        this.createdAt = comment.createdAt;
        this.images = comment.images || [];
    }
}
