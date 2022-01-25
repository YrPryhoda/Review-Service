import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min
} from 'class-validator';

export class CommentUpdateRequestDto {
    @IsNumber()
    @IsNotEmpty()
    @Max(5)
    @Min(0)
    rating: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 64, {message: 'Title must be between 1 and 64 characters'})
    title: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 256, {message: 'Comment content must be between 1 and 256 characters'})
    content: string;
}
