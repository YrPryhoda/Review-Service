import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {PlaceLikeRepository} from '@entities/place/like/place.like.repository';
import {PlaceLikeService} from '@entities/place/like/place.like.service';
import {PlacesEntityModule} from '@entities/place/place.module';
import {UsersEntityModule} from '@entities/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlaceLikeRepository]),
        PlacesEntityModule,
        UsersEntityModule
    ],
    providers: [PlaceLikeService],
    exports: [PlaceLikeService]
})
export class PlacesLikesEntityModule {
}
