import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {CommentLikeRepository} from '@entities/comment/like/comment.like.repository';
import {CommentLikeResponseDto} from '@dtos/comments/like/like.response.dto';
import {CommentService} from '@entities/comment/comment.service';
import {UsersService} from '@entities/user/users.service';

@Injectable()
export class CommentLikeService {
    constructor(
        @InjectRepository(CommentLikeRepository)
        private commentLikeRepository: CommentLikeRepository,
        private userService: UsersService,
        private commentService: CommentService
    ) {
    }

    async createLike(userId: number, commentId: number): Promise<CommentLikeResponseDto[]> {
        const user = await this.userService.getUserById(userId);
        const comment = await this.commentService.findCommentById(commentId);

        if (!user || !comment) {
            throw new BadRequestException();
        }
        const isLiked = await this.commentLikeRepository.findLikeUserToComment(userId, commentId);

        if (isLiked) {
            throw new ConflictException();
        }

        await this.commentLikeRepository.save({user, comment});
        const likes = await this.commentLikeRepository.findLikesByCommentId(comment.id);

        return likes.length ? likes.map(like => new CommentLikeResponseDto(like)) : likes;
    }
}
