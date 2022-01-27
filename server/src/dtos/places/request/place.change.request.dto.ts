import {IsOptional, IsString} from 'class-validator';

export class PlaceChangeRequestDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    houseNumber?: string;

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    facilities?: string;

    @IsOptional()
    @IsString()
    categories?: string;

    @IsOptional()
    @IsString()
    contact?: string;
}
