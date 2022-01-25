import {PlaceApiInterface} from '@entities/place/interfaces/places.api.interface';
import {PlaceDetailsInterface} from '@entities/place/geoapify/interfaces/place.details';

interface Details extends PlaceApiInterface, PlaceDetailsInterface {
}

interface Feature {
    type: string;
    properties: Details;
}

export interface GeoapifyLocationInterface {
    features: Feature[];
}

export interface GeoapifyPlaceInterface{
    results: PlaceApiInterface[]
}
