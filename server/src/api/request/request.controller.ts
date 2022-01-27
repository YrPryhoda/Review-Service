import {Controller, Delete, Get, Param, Post, Req, Body, UseGuards, HttpCode} from '@nestjs/common';

import {RequestResponseDto, PlaceChangeConfirmDto, PlaceChangeRequestDto} from '@dtos/places/request';
import {PlaceChangeRequestService} from '@entities/place/request/request.service';
import {RolesGuard} from '@common/guards/credentials/admin.credentials.guard';
import {JwtAuthGuard} from '@common/guards/auth/jwt-auth.guard';
import {StatusCodes} from 'http-status-codes';

@Controller('requests')
export class PlacesChangeRequestController {
    constructor(
        private placeChangeService: PlaceChangeRequestService
    ) {
    }

    @Get()
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async getRequests() {
        const requests = await this.placeChangeService.findAll();
        return requests.map(req => new RequestResponseDto(req));
    }

    @Post('create/:placeId')
    @UseGuards(JwtAuthGuard)
    async createRequest(
        @Req() req,
        @Param('placeId') placeId: string,
        @Body() data: PlaceChangeRequestDto
    ) {
        const {id} = req.user;
        const request = await this.placeChangeService.createRequest(placeId, id, data);
        return new RequestResponseDto(request);
    }

    @Post('confirm/:placeId')
    @HttpCode(StatusCodes.OK)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async approveRequest(
        @Param('placeId') placeId: string,
        @Body() data: PlaceChangeConfirmDto
    ) {
        return await this.placeChangeService.approveRequest(placeId, data);
    }

    @Delete(':placeId')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async rejectRequest(
        @Param('placeId') placeId: number
    ) {
        return this.placeChangeService.rejectRequest(placeId);
    }
}
