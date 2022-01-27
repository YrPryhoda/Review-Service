import {EntityRepository, Repository} from 'typeorm';
import {PlaceChangeRequest} from '@entities/place/request/request.entity';

@EntityRepository(PlaceChangeRequest)
export class PlaceChangeRequestRepository extends Repository<PlaceChangeRequest> {
    async findAll() {
        return this.find({
            relations: ['user', 'place']
        });


    }
}
