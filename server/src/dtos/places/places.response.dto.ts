import {PlaceApiInterface} from '@entities/place/interfaces/places.api.interface';

export class PlacesResponseDto {
    readonly id?: string;
    readonly name: string;
    readonly houseNumber?: string;
    readonly street: string;
    readonly city: string;
    readonly lon?: number;
    readonly lat?: number;
    readonly formatted: string;
    readonly addressLine2?: string;
    readonly categories: string;
    readonly resultType?: string;
    readonly importance?: number;
    readonly popularity?: number;
    readonly matchType?: string;

    constructor(data: Partial<PlaceApiInterface>) {
        if (data) {
            this.id = data.place_id || data.id;
            this.name = data.name;
            this.houseNumber = data.housenumber;
            this.street = data.street;
            this.city = data.city;
            this.lon = data.lon;
            this.lat = data.lat;
            this.formatted = data.formatted;
            this.addressLine2 = data.address_line2;
            this.categories = data.categories;
            this.resultType = data.result_type;
            if (data.rank) {
                this.importance = data.rank.importance;
                this.popularity = data.rank.popularity;
                this.matchType = data.rank.match_type;
            }
        }
    }
}
