import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    Entity,
    Column
} from 'typeorm';

import {PlaceNormalizedInterface} from '@entities/place/interfaces/place.normalized.interface';
import {UserResponse} from '@entities/user/interfaces/user.interface';
import {PlaceLike} from '@entities/place/like/place.like.entity';
import {Comment} from '@entities/comment/comment.entity';
import {User} from '@entities/user/user.entity';

@Entity()
export class Place implements PlaceNormalizedInterface {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', length: 64, nullable: false, unique: false})
    name: string;

    @Column({type: 'varchar', length: 16, nullable: true, unique: false})
    houseNumber?: string;

    @Column({type: 'varchar', length: 64, nullable: false, unique: false})
    street: string;

    @Column({type: 'varchar', length: 64, nullable: false, unique: false})
    city: string;

    @Column({type: 'float', nullable: true, unique: false})
    lon?: number;

    @Column({type: 'float', nullable: true, unique: false})
    lat?: number;

    @Column({type: 'varchar', length: 128, nullable: false, unique: false})
    formatted: string;

    @Column({type: 'varchar', length: 64, nullable: false, unique: false})
    addressLine2: string;

    @Column({type: 'varchar', length: 128, nullable: true, unique: false})
    facilities?: string;

    @Column({type: 'varchar', length: 64, nullable: false, unique: false})
    categories: string;

    @Column({type: 'varchar', length: 48, nullable: true, unique: false})
    contact?: string;

    @Column({type: 'varchar', length: 48, nullable: true, unique: false})
    resultType?: string;

    @Column({type: 'int', nullable: true, unique: false})
    importance?: number;

    @Column({type: 'int', nullable: true, unique: false})
    popularity?: number;

    @Column({type: 'int', nullable: true, unique: false})
    matchType?: string;

    @CreateDateColumn({update: false})
    createdAt: Date;

    @UpdateDateColumn({update: true})
    updatedAt: Date;

    @ManyToOne(
        () => User,
        user => user.places,
        {onDelete: 'CASCADE'}
    )
    user: UserResponse;

    @OneToMany(
        () => Comment,
        comment => comment.place
    )
    comments: Comment[];

    @OneToMany(
        () => PlaceLike,
        placeLike => placeLike.place
    )
    likes: PlaceLike[];
}
