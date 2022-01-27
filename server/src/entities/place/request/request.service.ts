import {BadRequestException, Injectable} from '@nestjs/common';

import {PlaceChangeRequestRepository} from '@entities/place/request/request.repository';
import {PlaceChangeConfirm, PlaceChangeInput} from '@entities/place/request/interfaces';
import {PlacesService} from '@entities/place/place.service';
import {UsersService} from '@entities/user/users.service';

@Injectable()
export class PlaceChangeRequestService {
    constructor(
        private placeChangeRepository: PlaceChangeRequestRepository,
        private placeService: PlacesService,
        private userService: UsersService
    ) {
    }

    async findAll() {
        return this.placeChangeRepository.findAll();
    }

    async createRequest(placeId: string, userId: string, data: PlaceChangeInput) {
        const place = await this.placeService.getPlaceById(placeId);
        if (place.placeSource) {
            throw new BadRequestException('Only requests to place from local database are accepted');
        }

        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new BadRequestException('Not found');
        }

        const newRequest = {
            place,
            user,
            ...data
        };

        return await this.placeChangeRepository.save(newRequest);
    }

    async approveRequest(placeId: string, data: PlaceChangeConfirm) {
        const {id, ...form} = data;
        const request = await this.placeChangeRepository.findOne({id});
        if (!request) {
            throw new BadRequestException('Request not found');
        }

        await this.placeService.updatePlace(placeId, form);
        await this.placeChangeRepository.delete(id);
        return request;
    }

    async rejectRequest(id: number) {
        const request = await this.placeChangeRepository.findOne({id});
        await this.placeChangeRepository.delete(id);
        return request;
    }
}
