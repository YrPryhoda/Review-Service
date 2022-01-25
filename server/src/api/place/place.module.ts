import {Module} from '@nestjs/common';

import {PlacesLikesEntityModule} from '@entities/place/like/place.like.module';
import {AuthEntityModule} from '@entities/user/auth/auth.module';
import {PlacesEntityModule} from '@entities/place/place.module';
import {PlacesController} from './place.controller';

@Module({
    imports: [AuthEntityModule, PlacesEntityModule, PlacesLikesEntityModule],
    controllers: [PlacesController]
})
export class PlacesApiModule {
}
