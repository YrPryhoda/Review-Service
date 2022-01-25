import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {CommentLikeRepository} from '@entities/comment/like/comment.like.repository';
import {CommentLikeService} from '@entities/comment/like/comment.like.service';
import {CommentEntityModule} from '@entities/comment/comment.module';
import {UsersEntityModule} from '@entities/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentLikeRepository]),
        CommentEntityModule,
        UsersEntityModule
    ],
    providers: [CommentLikeService],
    exports: [CommentLikeService]
})
export class CommentsLikesEntityModule {
}
