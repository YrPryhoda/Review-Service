import {EntityRepository, Repository} from 'typeorm';
import {CommentLike} from '@entities/comment/like/comment.like.entity';

@EntityRepository(CommentLike)
export class CommentLikeRepository extends Repository<CommentLike> {
    async findLikeUserToComment(userId: number, commentId: number) {
        return this.findOne({
            where: {
                user: {id: userId},
                comment: {id: commentId}
            }
        });
    }

    async findLikesByCommentId(id: number) {
        return await this.find({
            relations: ['user'],
            where: {comment: {id}}
        });
    }
}
