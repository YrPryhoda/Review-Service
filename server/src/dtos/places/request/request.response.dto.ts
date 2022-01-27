import {PlaceChange} from '@entities/place/request/interfaces';
import {UsersResponseDto} from '@dtos/users';
import {PlaceDetailsDto, PlacesResponseDto} from '@dtos/places';

export class RequestResponseDto {
    private id: number;
    private place: PlacesResponseDto;
    private user: UsersResponseDto;
    private name: string;
    private website: string;
    private houseNumber: string;
    private street: string;
    private facilities: string;
    private categories: string;
    private contact: string;
    private createdAt: Date;

    constructor(data: PlaceChange) {
        if (data) {
            this.id = data.id;
            this.place = new PlaceDetailsDto(data.place);
            this.user = new UsersResponseDto(data.user);
            this.name = data.name;
            this.website = data.website;
            this.houseNumber = data.houseNumber;
            this.street = data.street;
            this.facilities = data.facilities;
            this.categories = data.categories;
            this.contact = data.contact;
            this.createdAt = data.createdAt;
        }
    }
}
