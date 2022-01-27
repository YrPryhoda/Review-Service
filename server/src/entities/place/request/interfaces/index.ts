import {Place} from '@entities/place/place.entity';
import {User} from '@entities/user/user.entity';

export interface PlaceChange {
    id: number;
    name?: string;
    website?: string;
    houseNumber?: string;
    street?: string;
    facilities?: string;
    categories?: string;
    contact?: string;
    place: Place;
    user: User;
    createdAt: Date;
}

export interface PlaceChangeInput extends Omit<PlaceChange, 'id' | 'createdAt' | 'place' | 'user'> {
}

export interface PlaceChangeConfirm extends Omit<PlaceChange, 'createdAt' | 'place' | 'user'> {
}
