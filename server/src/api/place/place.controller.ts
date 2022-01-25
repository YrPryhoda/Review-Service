import {Req, Body, Controller, Get, Param, Post, Query, UseGuards, Delete, HttpCode} from '@nestjs/common';
import {StatusCodes} from 'http-status-codes';

import {PlaceLikeService} from '@entities/place/like/place.like.service';
import {PlaceLikeRequestDto} from '@dtos/places/like/like.request.dto';
import {JwtAuthGuard} from '@common/guards/auth/jwt-auth.guard';
import {AuthService} from '@entities/user/auth/auth.service';
import {PlacesService} from '@entities/place/place.service';
import {PlaceRequestDto} from '@dtos/places';

@Controller('places')
export class PlacesController {
    constructor(
        private authService: AuthService,
        private placeService: PlacesService,
        private placeLikeService: PlaceLikeService
    ) {
    }

    @Get('coordinates/:lat/:lon')
    async placeByCoordinates(@Param() params) {
        const {lat, lon} = params;
        return await this.placeService.getPlaceByCoordinates(lat, lon);
    }

    @Get()
    async places(@Query() query) {
        const {city, name, offset} = query;
        return await this.placeService.getPlaces(city, name, offset);
    }

    @Post('like')
    @UseGuards(JwtAuthGuard)
    async createLike(@Req() req, @Body() body: PlaceLikeRequestDto) {
        return await this.placeLikeService.createLike(req.user.id, body);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Req() req, @Body() body: PlaceRequestDto) {
        return await this.placeService.createPlace(req.user.id, body);
    }

    @Get(':placeId')
    async place(@Param() params: { placeId: string }) {
        return await this.placeService.getPlaceById(params.placeId);
    }

    @Delete(':placeId')
    @UseGuards(JwtAuthGuard)
    @HttpCode(StatusCodes.NO_CONTENT)
    async delete(@Req() req, @Param() params: { placeId: string }) {
        return await this.placeService.deletePlace(req.user.id, params.placeId);
    }
}
