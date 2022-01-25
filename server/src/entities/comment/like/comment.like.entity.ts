import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity} from 'typeorm';

import {CommentLikeInterface} from '@entities/comment/like/interfaces/like.interface';
import {Comment} from '@entities/comment/comment.entity';
import {User} from '@entities/user/user.entity';

@Entity()
export class CommentLike implements CommentLikeInterface {
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn({update: false})
    createdAt: Date;

    @UpdateDateColumn({update: true})
    updatedAt: Date;

    @ManyToOne(
        () => Comment,
        comment => comment.likes,
        {onDelete: 'CASCADE'}
    )
    comment: Comment;

    @ManyToOne(
        () => User,
        user => user.commentsLikes,
        {onDelete: 'CASCADE'}
    )
    user: User;
}
