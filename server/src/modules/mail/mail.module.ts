import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {MailerModule} from '@nestjs-modules/mailer';
import {ConfigService} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {join} from 'path';

import {MailService} from '@common/services/mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const host = config.get('MAIL_DOMAIN');
                const port = config.get('MAIL_PORT');
                const user = config.get('GMAIL_USER');
                const pass = config.get('GMAIL_PASSWORD');

                return {
                    transport: {host, port, secure: true, auth: {user, pass}},
                    template: {
                        dir: join(process.cwd(), 'dist/common/templates/'),
                        default: {from: `"No-reply"<${user}>`},
                        adapter: new HandlebarsAdapter(),
                        options: {strict: true}
                    }
                };
            }
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {
}
