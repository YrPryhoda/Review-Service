import {PlaceDetailsDto} from '@dtos/places';

export class PlaceCreateDto extends PlaceDetailsDto {
    readonly name: string;
    readonly street: string;
    readonly city: string;
    readonly formatted: string;
    readonly addressLine2: string;
    readonly facilities: string;

    constructor(data) {
        super(data);
        this.name = data.name;
        this.street = data.street;
        this.city = data.city;
        this.facilities = data.facilities;
        this.formatted = `${data.name}, ${data.street}, ${data.city}`;
        this.addressLine2 = `${data.street}, ${data.city}`;
    }
}
