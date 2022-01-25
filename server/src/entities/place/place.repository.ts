import {EntityRepository, Repository} from 'typeorm';
import {Place} from '@entities/place/place.entity';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
    async findById(id: string | number) {
        return await this.createQueryBuilder('place')
            .where('place.id = :id', {id})
            .leftJoinAndSelect('place.user', 'user')
            .leftJoinAndSelect('place.comments', 'comments')
            .orderBy({
                'comments.createdAt': 'DESC'
            })
            .leftJoinAndSelect('comments.user', 'ComUser')
            .leftJoinAndSelect('comments.images', 'ComImg')
            .leftJoinAndSelect('comments.likes', 'ComLikes')
            .leftJoinAndSelect('ComLikes.user', 'ComLikeUser')
            .leftJoinAndSelect('place.likes', 'PlaceLikes')
            .leftJoinAndSelect('PlaceLikes.user', 'LikeUsers')
            .getOne();
    }
}
