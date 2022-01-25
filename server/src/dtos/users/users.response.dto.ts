import {UserInterface} from '@entities/user/interfaces/user.interface';

export class UsersResponseDto {
    readonly id: string;

    readonly firstName: string;

    readonly lastName: string;

    readonly email: string;

    readonly createdAt: Date;

    constructor(data?: Partial<UserInterface>) {
        if (data) {
            this.id = data.id;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
            this.createdAt = data.createdAt;
        }
    }
}
