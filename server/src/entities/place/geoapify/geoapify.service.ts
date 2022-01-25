import {forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {HttpService} from '@nestjs/axios';

import {PlaceNormalizedInterface} from '@entities/place/interfaces/place.normalized.interface';
import {PlaceLikeService} from '@entities/place/like/place.like.service';
import {CommentService} from '@entities/comment/comment.service';
import {PlacesResponseDto, PlaceDetailsDto} from '@dtos/places';
import {
    GeoapifyLocationInterface,
    GeoapifyPlaceInterface
} from '@entities/place/geoapify/interfaces/geoapify.response';

@Injectable()
export class GeoapifyService {
    private readonly apiKey: string;
    private readonly apiUrl: string;

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        @Inject(forwardRef(() => CommentService)) private commentService: CommentService,
        @Inject(forwardRef(() => PlaceLikeService)) private placeLikeService: PlaceLikeService
    ) {
        this.apiKey = this.configService.get('GEO_APIFY_API_KEY');
        this.apiUrl = this.configService.get('GEO_APIFY_URL');
    }

    async fetchData(request: string): Promise<GeoapifyPlaceInterface | GeoapifyLocationInterface> {
        try {
            const observable = await this.httpService.get(request).toPromise();
            return observable.data;
        } catch (e) {
            throw new NotFoundException(e);
        }
    }

    async getAPIPlaceById(id: number | string): Promise<PlaceNormalizedInterface> {
        const request = `${this.apiUrl}/v2/place-details?id=${id}&apiKey=${this.apiKey}`;
        const {features} = await this.fetchData(request) as GeoapifyLocationInterface;

        if (!features.length) {
            return null;
        }

        const response = features[0].properties;
        const comments = await this.commentService.findCommentsByExternalPlaceId(response.place_id);
        const likes = await this.placeLikeService.findLikesByExternalPlaceId(response.place_id);

        const formedPlace = {
            ...response,
            comments,
            likes,
            placeSource: 'geoapify'
        };

        return new PlaceDetailsDto(formedPlace);
    }

    async getAPIPlaceByCoordinates(lat: string, lon: string) {
        const request = `${this.apiUrl}/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${this.apiKey}`;

        const {results} = await this.fetchData(request) as GeoapifyPlaceInterface;
        return new PlacesResponseDto(results[0]);
    }

    async getAPIPlacesByParams(city?: string, name?: string, limit = 20, offset = 0):
        Promise<PlaceNormalizedInterface[] | []> {
        try {
            let request = `${this.apiUrl}/v1/geocode/search?`;
            const metadata = `filter=countrycode:ua&bias=countrycode:none&format=json&${limit}&${offset}&apiKey=${this.apiKey}`;
            const stringEncode = (string: string) => encodeURI(string ? string.trim() : '');
            const searchName = stringEncode(name);
            const searchCity = stringEncode(city);

            if (!searchName && searchCity) {
                request += `city=${searchCity}&${metadata}`;
                const {results} = await this.fetchData(request) as GeoapifyPlaceInterface;
                if (!results.length) return [];
                const {lon, lat} = results[0];

                return await this.getAPIPlacesByLocation(limit, offset, [lon, lat, 10000]);
            }

            searchName && (request += `name=${searchName}&`);
            searchCity && (request += `city=${searchCity}&`);

            request += metadata;
            const response = await this.fetchData(request) as GeoapifyPlaceInterface;

            return response.results.length
                ? response.results.map(el => new PlacesResponseDto(el))
                : [];
        } catch (e) {
            console.log(e);
            throw new NotFoundException(e);
        }
    }

    async getAPIPlacesByLocation(
        limit = 20,
        offset = 0,
        coords = [30.5241361, 50.4500336, 10000]
    ): Promise<PlaceNormalizedInterface[] | []> {
        try {
            const [lat, lon, radius] = coords;
            const filter = `filter=circle:${lat},${lon},${radius}&limit=${limit}&offset=${offset}`;
            const request = `${this.apiUrl}/v2/places?categories=catering&${filter}&apiKey=${this.apiKey}`;
            const response = await this.fetchData(request) as GeoapifyLocationInterface;

            return response.features.length
                ? response.features.map(el => new PlacesResponseDto(el.properties))
                : [];
        } catch (e) {
            throw new NotFoundException(e);
        }
    }
}
