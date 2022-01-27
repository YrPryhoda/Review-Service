import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PlaceChange} from '@entities/place/request/interfaces';
import {Place} from '@entities/place/place.entity';
import {User} from '@entities/user/user.entity';

@Entity()
export class PlaceChangeRequest implements PlaceChange {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 64, nullable: true, unique: false})
    name?: string;

    @Column({type: 'varchar', length: 16, nullable: true, unique: false})
    houseNumber?: string;

    @Column({type: 'varchar', length: 64, nullable: true, unique: false})
    street?: string;

    @Column({type: 'varchar', length: 64, nullable: true, unique: false})
    website?: string;

    @Column({type: 'varchar', length: 256, nullable: true, unique: false})
    facilities?: string;

    @Column({type: 'varchar', length: 256, nullable: true, unique: false})
    categories?: string;

    @Column({type: 'varchar', length: 256, nullable: true, unique: false})
    contact?: string;

    @CreateDateColumn({update: false})
    createdAt: Date;

    @ManyToOne(() => Place, place => place.requests)
    place: Place;

    @ManyToOne(() => User, user => user.requests)
    user: User;
}
