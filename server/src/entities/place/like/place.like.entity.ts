import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Entity, Column
} from 'typeorm';

import {PlaceLikeInterface} from '@entities/place/like/interfaces/like.interface';
import {Place} from '@entities/place/place.entity';
import {User} from '@entities/user/user.entity';

@Entity()
export class PlaceLike implements PlaceLikeInterface {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', unique: false, nullable: true})
    externalPlaceId?: string;

    @CreateDateColumn({update: false})
    createdAt: Date;

    @UpdateDateColumn({update: true})
    updatedAt: Date;

    @ManyToOne(
        () => Place,
        place => place.likes,
        {onDelete: 'CASCADE'}
    )
    place: Place;

    @ManyToOne(
        () => User,
        user => user.placesLikes,
        {onDelete: 'CASCADE'}
    )
    user: User;
}
