import {
    IsNotEmpty
} from 'class-validator';

export class PlaceLikeRequestDto {
    @IsNotEmpty()
    readonly placeId: string;
}
