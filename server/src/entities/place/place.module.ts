import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {HttpModule} from '@nestjs/axios';

import {GeoapifyEntityModule} from '@entities/place/geoapify/geoapify.module';
import {PlaceRepository} from '@entities/place/place.repository';
import {UsersEntityModule} from '@entities/user/user.module';
import {PlacesService} from '@entities/place/place.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlaceRepository]),
        GeoapifyEntityModule,
        UsersEntityModule,
        ConfigModule,
        HttpModule
    ],
    providers: [PlacesService],
    exports: [PlacesService]
})
export class PlacesEntityModule {
}
