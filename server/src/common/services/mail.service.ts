import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {UserInterface} from '@entities/user/interfaces/user.interface';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) {
    }

    async signUpConfirm(user: UserInterface) {
        try {
            return await this.mailerService
                .sendMail({
                    to: user.email,
                    subject: 'Sign Up confirm',
                    template: 'signup.confirm.hbs',
                    context: {
                        id: user.id,
                        link: user.signupConfirmId,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                });
        } catch (e) {
            console.log(e, 'Mailer error');
        }
    }
}
