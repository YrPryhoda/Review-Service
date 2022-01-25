import {IsNotEmpty, IsString, IsNumber, Length, Max, Min, IsNumberString} from 'class-validator';
import {Type} from 'class-transformer';

export class CommentRequestDto {
    @IsNumberString()
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    placeId: number;

    @IsNumber()
    @IsNotEmpty()
    @Max(5, {message: 'Five is a maximum value'})
    @Min(0, {message: 'Zero is a minimal value'})
    @Type(() => Number)
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
