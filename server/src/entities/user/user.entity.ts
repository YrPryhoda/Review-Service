import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Entity,
    Column,
    Unique
} from 'typeorm';

import {CommentLike} from '@entities/comment/like/comment.like.entity';
import {EmailStatus, UserInterface, UserRole} from './interfaces/user.interface';
import {PlaceLike} from '@entities/place/like/place.like.entity';
import {Comment} from '@entities/comment/comment.entity';
import {Place} from '@entities/place/place.entity';
import {PlaceChangeRequest} from '@entities/place/request/request.entity';

@Entity()
@Unique('email', ['email'])
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 64, nullable: false, unique: false})
    firstName: string;

    @Column({type: 'varchar', length: 64, nullable: false, unique: false})
    lastName: string;

    @Column({type: 'varchar', length: 64, nullable: false})
    email: string;

    @Column({type: 'enum', enum: EmailStatus, nullable: true, default: EmailStatus.Pending})
    emailStatus: EmailStatus;

    @Column({type: 'enum', enum: UserRole, nullable: true, default: UserRole.User})
    userRole: UserRole;

    @Column({type: 'varchar', length: 256, nullable: true, default: null})
    signupConfirmId: string;

    @Column({type: 'varchar', length: 64, nullable: false})
    password: string;

    @Column({type: 'varchar', length: 256, nullable: true})
    token?: string;

    @CreateDateColumn({update: false})
    createdAt: Date;

    @UpdateDateColumn({update: true})
    updatedAt: Date;

    @OneToMany(
        () => Comment,
        (comment) => comment.user
    )
    comments?: Comment[];

    @OneToMany(
        () => Place,
        place => place.user
    )
    places?: Place[];

    @OneToMany(
        () => CommentLike,
        commentLike => commentLike.user
    )
    commentsLikes?: CommentLike[];

    @OneToMany(
        () => PlaceLike,
        placeLike => placeLike.user
    )
    placesLikes?: PlaceLike[];

    @OneToMany(
        () => PlaceChangeRequest,
        placeChange => placeChange.user
    )
    requests?: PlaceChangeRequest[];
}
