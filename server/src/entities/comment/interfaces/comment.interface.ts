import {PlaceNormalizedInterface} from '@entities/place/interfaces/place.normalized.interface';
import {CommentLikeInterface} from '@entities/comment/like/interfaces/like.interface';
import {UserInterface, UserResponse} from '@entities/user/interfaces/user.interface';
import {Place} from '@entities/place/place.entity';
import {File} from '@entities/comment/file/file.entity';
import {FileInterface} from '@entities/comment/file/interfaces/file.interface';

export interface CommentInterface {
    id: number;
    title: string;
    content: string;
    rating: number;
    user: UserResponse;
    place?: Place;
    externalPlaceId?: string;
    likes?: CommentLikeInterface[];
    images?: FileInterface[];
    createdAt?: Date;
}

export interface CommentInputInterface {
    title: string;
    content: string;
    rating: number;
    user: UserInterface;
    place?: PlaceNormalizedInterface;
    externalPlaceId?: string;
    images?: File[];
}
