import {Module} from '@nestjs/common';

import {CommentsLikesEntityModule} from '@entities/comment/like/comment.like.module';
import {CommentEntityModule} from '@entities/comment/comment.module';
import {CommentsController} from './comments.controller';

@Module({
    controllers: [CommentsController],
    imports: [CommentEntityModule, CommentsLikesEntityModule]
})
export class CommentsApiModule {
}
