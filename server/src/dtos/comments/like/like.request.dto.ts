import {
    IsNotEmpty, IsNumber
} from 'class-validator';

export class CommentLikeRequestDto {
    @IsNumber()
    @IsNotEmpty()
    readonly commentId: number;
}
