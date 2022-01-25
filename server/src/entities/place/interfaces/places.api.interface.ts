/* eslint-disable */
export interface PlaceApiInterface {
    id?: string;
    place_id: string;
    name: string;
    housenumber?: string;
    street: string;
    city: string;
    lon: number;
    lat: number;
    formatted: string;
    address_line2: string;
    categories: string;
    result_type?: string;
    rank: {
        importance: number;
        popularity: number;
        match_type: string;
    };
}
