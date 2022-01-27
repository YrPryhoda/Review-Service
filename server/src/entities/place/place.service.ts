import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {DeleteResult, FindOperator, Like} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

import {PlaceNormalizedInterface} from '@entities/place/interfaces/place.normalized.interface';
import {GeoapifyService} from '@entities/place/geoapify/geoapify.service';
import {PlaceRepository} from '@entities/place/place.repository';
import {PlaceCreateDto, PlaceDetailsDto} from '@dtos/places';
import {UsersService} from '@entities/user/users.service';
import {Place} from '@entities/place/place.entity';
import {UsersResponseDto} from '@dtos/users';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(PlaceRepository)
        private placeRepository: PlaceRepository,
        private geoapifyService: GeoapifyService,
        private userRepository: UsersService
    ) {
    }

    async getPlaces(city?: string, name?: string, offset = 0, limit = 20):
        Promise<PlaceNormalizedInterface[] | []> {
        const skip = offset - 1 <= 0 ? 0 : (offset - 1) * limit;

        const apiPlaces = (!city && !name)
            ? await this.geoapifyService.getAPIPlacesByLocation(limit, skip)
            : await this.geoapifyService.getAPIPlacesByParams(city, name, limit, skip);

        const localPlaces = await this.getLocalPlaces(city, name, limit, skip);

        return [
            ...localPlaces,
            ...apiPlaces
        ];
    }

    async getPlaceById(id: string | number): Promise<PlaceNormalizedInterface> {
        try {
            const localPlace = await this.placeRepository.findById(id);

            if (!localPlace) {
                return await this.geoapifyService.getAPIPlaceById(id);
            }

            return new PlaceDetailsDto(localPlace);
        } catch (e) {
            throw new NotFoundException(e.message);
        }
    }

    async getPlaceByCoordinates(lat: string, lon: string) {
        return this.geoapifyService.getAPIPlaceByCoordinates(lat, lon);
    }

    async getLocalPlaces(city, name, limit, offset): Promise<PlaceNormalizedInterface[] | []> {
        const whereParams = {} as { city: FindOperator<string>, name: FindOperator<string> };
        city && (whereParams.city = Like(`%${city}%`));
        name && (whereParams.name = Like(`%${name}%`));

        return await this.placeRepository.find({
            where: whereParams,
            skip: offset,
            take: limit
        });
    }

    async createPlace(userId: string, place: Partial<Place>): Promise<PlaceNormalizedInterface> {
        try {
            const {id, ...placeToCreate} = new PlaceCreateDto(place);
            placeToCreate.user = new UsersResponseDto(await this.userRepository.getUserById(userId));
            const result = await this.placeRepository.save(placeToCreate);

            result.user = new UsersResponseDto(result.user);

            return result;
        } catch (e) {
            console.log(e);
        }
    }

    async updatePlace(placeId: string, form: Partial<Place>) {
        const place = await this.placeRepository.findOne({id: placeId});
        if (!place) {
            throw new NotFoundException();
        }

        return await this.placeRepository.update({id: placeId}, form);
    }

    async deletePlace(userId: string, placeId: string): Promise<DeleteResult> {
        const place = await this.placeRepository.findOne({
            where: {id: placeId},
            relations: ['user']
        });

        if (!place) {
            throw new NotFoundException();
        }

        if (place.user.id !== userId) {
            throw new BadRequestException();
        }

        return await this.placeRepository.delete(placeId);
    }
}
