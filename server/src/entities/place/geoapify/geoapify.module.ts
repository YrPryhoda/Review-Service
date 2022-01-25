import {forwardRef, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {HttpModule} from '@nestjs/axios';

import {PlacesLikesEntityModule} from '@entities/place/like/place.like.module';
import {GeoapifyService} from '@entities/place/geoapify/geoapify.service';
import {CommentEntityModule} from '@entities/comment/comment.module';

@Module({
    imports: [
        forwardRef(() => CommentEntityModule),
        forwardRef(() => PlacesLikesEntityModule),
        ConfigModule,
        HttpModule
    ],
    providers: [GeoapifyService],
    exports: [GeoapifyService]
})
export class GeoapifyEntityModule {
}
