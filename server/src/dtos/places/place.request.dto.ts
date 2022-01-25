import {
    IsOptional,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    IsLatitude,
    IsLongitude
} from 'class-validator';

export class PlaceRequestDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 64, {message: 'Name must be between 1 and 64 characters'})
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 64, {message: 'Street must be between 1 and 64 characters'})
    readonly street: string;

    @IsOptional()
    @IsString()
    readonly houseNumber?: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 64, {message: 'City must be between 1 and 64 characters'})
    readonly city: string;

    @IsOptional()
    @IsNumber()
    readonly lon?: number;

    @IsOptional()
    @IsLatitude()
    readonly lat?: number;

    @IsOptional()
    @IsLongitude()
    readonly formatted?: string;

    @IsOptional()
    @IsString()
    readonly website?: string;

    @IsOptional()
    @IsString()
    readonly facilities?: string;

    @IsOptional()
    @IsString()
    readonly contact?: string;

    @IsString()
    @IsNotEmpty({message: 'Choose category'})
    readonly categories: string;
}
