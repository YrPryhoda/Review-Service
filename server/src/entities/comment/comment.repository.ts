import {EntityRepository, Repository} from 'typeorm';
import {Comment} from '@entities/comment/comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
    async findCommentById(id: number) {
        return this.findOne({
            relations: ['user', 'images', 'likes', 'likes.user'],
            where: {id}
        });
    }

    async findByExternalPlaceId(id: string) {
        return await this.find({
            relations: ['user', 'images', 'likes', 'likes.user'],
            where: {
                externalPlaceId: id
            },
            order: {
                createdAt: 'DESC'
            }
        });
    }
}
