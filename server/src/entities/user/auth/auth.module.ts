import {PassportModule} from '@nestjs/passport';
import {ConfigService} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';

import {LocalStrategy} from '@common/strategies/auth/local.strategy';
import {JwtStrategy} from '@common/strategies/auth/jwt.strategy';
import {UsersEntityModule} from '@entities/user/user.module';
import {AuthService} from './auth.service';

@Module({
    imports: [
        UsersEntityModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: 24 * 3600
                    }
                };
            },
            inject: [ConfigService]
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthEntityModule {
}
