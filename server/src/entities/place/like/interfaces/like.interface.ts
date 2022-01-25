import {PlaceNormalizedInterface} from '@entities/place/interfaces/place.normalized.interface';
import {UserInterface} from '@entities/user/interfaces/user.interface';

export interface PlaceLikeRequest {
    placeId: string;
}

export interface PlaceLikeInterface {
    id?: string;
    user: UserInterface;
    place?: PlaceNormalizedInterface
    createdAt?: Date;
}
