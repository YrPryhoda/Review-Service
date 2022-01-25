import {IsNotEmpty, IsString, Length} from 'class-validator';

export class UsersRequestDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 64, {message: 'first name must be between 1 and 64 characters'})
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 64, {message: 'last name must be between 1 and 64 characters'})
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 64, {message: 'password must be between 1 and 64 characters'})
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100, {message: 'email must be between 1 and 100 characters'})
    readonly email: string;
}
