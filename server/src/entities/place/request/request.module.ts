import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {PlaceChangeRequestRepository} from '@entities/place/request/request.repository';
import {PlaceChangeRequestService} from '@entities/place/request/request.service';
import {PlacesEntityModule} from '@entities/place/place.module';
import {UsersEntityModule} from '@entities/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlaceChangeRequestRepository]),
        UsersEntityModule,
        PlacesEntityModule
    ],
    providers: [PlaceChangeRequestService],
    exports: [PlaceChangeRequestService]
})
export class PlacesChangeRequestEntityModule {
}
