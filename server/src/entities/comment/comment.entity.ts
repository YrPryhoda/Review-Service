import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    Entity,
    Column
} from 'typeorm';

import {CommentInterface} from '@entities/comment/interfaces/comment.interface';
import {CommentLike} from '@entities/comment/like/comment.like.entity';
import {Place} from '@entities/place/place.entity';
import {User} from '@entities/user/user.entity';
import {UserResponse} from '@entities/user/interfaces/user.interface';
import {File} from '@entities/comment/file/file.entity';

@Entity({
    orderBy: {createdAt: 'DESC'}
})
export class Comment implements CommentInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 64, nullable: false, unique: false})
    title: string;

    @Column({type: 'int', nullable: false, unique: false, default: 0})
    rating: number;

    @Column({type: 'varchar', length: 256, nullable: false, unique: false})
    content: string;

    @Column({type: 'varchar', length: 256, nullable: true, unique: false})
    externalPlaceId: string;

    @CreateDateColumn({update: false})
    createdAt: Date;

    @UpdateDateColumn({update: true})
    updatedAt: Date;

    @ManyToOne(
        () => User,
        user => user.comments,
        {onDelete: 'CASCADE'}
    )
    user: UserResponse;

    @ManyToOne(
        () => Place,
        place => place.comments,
        {onDelete: 'CASCADE'}
    )
    place: Place;

    @OneToMany(
        () => CommentLike,
        commentLike => commentLike.comment
    )
    likes: CommentLike[];

    @OneToMany(
        () => File,
        file => file.comment
    )
    images: File[];
}
