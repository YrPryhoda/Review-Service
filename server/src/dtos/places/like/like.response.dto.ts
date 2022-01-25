import {PlaceLikeInterface} from '@entities/place/like/interfaces/like.interface';
import {UsersResponseDto} from '@dtos/users';

export class PlaceLikeResponseDto {
    readonly id: string;
    readonly user: UsersResponseDto;
    readonly createdAt: Date;

    constructor(like: PlaceLikeInterface) {
        this.id = like.id;
        this.user = new UsersResponseDto(like.user);
        this.createdAt = like.createdAt;
    }
}
