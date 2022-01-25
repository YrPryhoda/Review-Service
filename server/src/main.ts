import {NestFactory} from '@nestjs/core';

import {ValidationPipe} from '@common/pipes/validation.pipe';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false
    });
    await app.listen(process.env.APP_PORT);
}

bootstrap();
