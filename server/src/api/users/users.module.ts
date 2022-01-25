import {Module} from '@nestjs/common';

import {UsersEntityModule} from '@entities/user/user.module';
import {UsersController} from './users.controller';

@Module({
    imports: [UsersEntityModule],
    controllers: [UsersController]
})
export class UsersApiModule {
}
