import {
    PrimaryGeneratedColumn,
    ManyToOne,
    Entity,
    Column, CreateDateColumn
} from 'typeorm';

import {Comment} from '@entities/comment/comment.entity';
import {FileInterface} from '@entities/comment/file/interfaces/file.interface';

@Entity()
export class File implements FileInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    url: string;

    @CreateDateColumn({update: false})
    createdAt: Date;

    @ManyToOne(() => Comment, comment => comment.images, {
        onDelete: 'CASCADE'
    })
    comment: Comment;
}
