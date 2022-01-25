import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {CommentRepository} from '@entities/comment/comment.repository';
import {FileEntityModule} from '@entities/comment/file/file.module';
import {PlacesEntityModule} from '@entities/place/place.module';
import {UsersEntityModule} from '@entities/user/user.module';
import {CommentService} from './comment.service';

@Module({
    providers: [CommentService],
    imports: [
        TypeOrmModule.forFeature([CommentRepository]),
        UsersEntityModule,
        forwardRef(() => PlacesEntityModule),
        FileEntityModule
    ],
    exports: [CommentService]
})
export class CommentEntityModule {
}
