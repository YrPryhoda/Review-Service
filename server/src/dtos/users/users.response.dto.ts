import {UserInterface, UserRole} from '@entities/user/interfaces/user.interface';

export class UsersResponseDto {
    readonly id: string;

    readonly firstName: string;

    readonly lastName: string;

    readonly email: string;

    readonly createdAt: Date;

    readonly userRole: UserRole;

    constructor(data?: Partial<UserInterface>) {
        if (data) {
            this.id = data.id;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
            this.createdAt = data.createdAt;
            this.userRole = data.userRole;
        }
    }
}
