import {Module} from '@nestjs/common';
import {PlacesChangeRequestEntityModule} from '@entities/place/request/request.module';
import {PlacesChangeRequestController} from '@api/request/request.controller';

@Module({
    imports: [PlacesChangeRequestEntityModule],
    controllers: [PlacesChangeRequestController]
})
export class PlaceChangeRequestApiModule {
}
