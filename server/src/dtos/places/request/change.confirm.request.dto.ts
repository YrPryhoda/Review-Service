import {PlaceChangeRequestDto} from '@dtos/places/request/place.change.request.dto';
import {IsNumber} from 'class-validator';

export class PlaceChangeConfirmDto extends PlaceChangeRequestDto {
    @IsNumber()
    id: number;
}
