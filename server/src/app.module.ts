import {ServeStaticModule} from '@nestjs/serve-static';
import {MulterModule} from '@nestjs/platform-express';
import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {join} from 'path';

import {DatabaseModule} from '@modules/database/database.module';
import {MailModule} from '@modules/mail/mail.module';
import {ApiModule} from '@api/api.module';

@Module({
    imports: [
        ApiModule,
        DatabaseModule,
        ConfigModule.forRoot({isGlobal: true}),

        MulterModule.register(),
        MailModule
    ]
})
export class AppModule {
}
