import {CommentInterface} from '@entities/comment/interfaces/comment.interface';
import {UserResponse} from '@entities/user/interfaces/user.interface';
import {PlaceLikeInterface} from '@entities/place/like/interfaces/like.interface';

export interface PlaceNormalizedInterface {
    id?: string;
    name: string;
    houseNumber?: string;
    street: string;
    city: string;
    lon?: number;
    lat?: number;
    formatted: string;
    addressLine2?: string;
    categories: string;
    contact?: string;
    resultType?: string;
    importance?: number;
    popularity?: number;
    matchType?: string;
    facilities?: string;
    user?: UserResponse;
    comments?: CommentInterface[];
    externalPlaceId?: string;
    placeSource?: string;
    likes?: PlaceLikeInterface[];
}
