import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {PlaceLikeInterface, PlaceLikeRequest} from '@entities/place/like/interfaces/like.interface';
import {PlaceLikeRepository} from '@entities/place/like/place.like.repository';
import {PlacesService} from '@entities/place/place.service';
import {UsersService} from '@entities/user/users.service';
import {PlaceLikeResponseDto} from '@dtos/places/like/like.response.dto';

@Injectable()
export class PlaceLikeService {
    constructor(
        @InjectRepository(PlaceLikeRepository)
        private placeLikeRepository: PlaceLikeRepository,
        private userService: UsersService,
        private placeService: PlacesService
    ) {
    }

    async findLikesByExternalPlaceId(id: string): Promise<PlaceLikeInterface[]> {
        return await this.placeLikeRepository.findLikesByExternalPlaceId(id);
    }

    async createLike(userId: string, body: PlaceLikeRequest): Promise<any> {
        const {placeId} = body;
        const existedLike = await this.placeLikeRepository.findUsersLikeToPlace(userId, placeId);

        if (existedLike) {
            throw new ConflictException();
        }

        const user = await this.userService.getUserById(userId);
        const place = await this.placeService.getPlaceById(placeId);

        if (!user || !place) {
            throw new NotFoundException();
        }

        const like = place.placeSource === 'geoapify' ? {user, externalPlaceId: place.id} : {user, place};
        await this.placeLikeRepository.save(like);
        const placeLikes = await this.placeLikeRepository.findLikesByPlaceId(place.id);

        return placeLikes.length ? placeLikes.map(el => new PlaceLikeResponseDto(el)) : placeLikes;
    }
}
