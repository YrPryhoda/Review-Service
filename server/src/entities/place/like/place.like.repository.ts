import {EntityRepository, Repository} from 'typeorm';
import {PlaceLike} from '@entities/place/like/place.like.entity';

@EntityRepository(PlaceLike)
export class PlaceLikeRepository extends Repository<PlaceLike> {
    async findLikesByPlaceId(id: number | string) {
        return this.find({
            relations: ['user'],
            where: [
                {place: {id}},
                {externalPlaceId: id}
            ]
        });
    }

    async findUsersLikeToPlace(userId: string, placeId: string) {
        return await this.findOne({
            where: [
                {user: {id: userId}, place: {id: placeId}},
                {user: {id: userId}, externalPlaceId: placeId}
            ]
        });
    }

    async findLikesByExternalPlaceId(id: string) {
        return await this.find({
            relations: ['user'],
            where: {
                externalPlaceId: id
            }
        });
    }
}
