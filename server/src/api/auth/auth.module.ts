import {Module} from '@nestjs/common';

import {AuthEntityModule} from '@entities/user/auth/auth.module';
import {UsersEntityModule} from '@entities/user/user.module';
import {AuthController} from './auth.controller';
import {MailModule} from '@modules/mail/mail.module';

@Module({
    imports: [AuthEntityModule, UsersEntityModule, MailModule],
    controllers: [AuthController],
    providers: []
})
export class AuthApiModule {
}
