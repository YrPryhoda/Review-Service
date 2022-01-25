import {PlaceDetailsInterface} from '@entities/place/geoapify/interfaces/place.details';
import {CommentInterface} from '@entities/comment/interfaces/comment.interface';
import {FileInterface} from '@entities/comment/file/interfaces/file.interface';
import {PlaceLikeResponseDto} from '@dtos/places/like/like.response.dto';
import {CommentResponseDto} from '@dtos/comments';
import {PlacesResponseDto} from '@dtos/places';
import {UsersResponseDto} from '@dtos/users';
import path from 'path';

export class PlaceDetailsDto extends PlacesResponseDto implements PlaceDetailsInterface {
    readonly website?: string;
    readonly openingHours?: string;
    readonly contact?: string;
    readonly facilities?: string;
    readonly user?: UsersResponseDto;
    readonly placeSource?: string;
    readonly comments?: CommentInterface[];
    readonly likes?: PlaceLikeResponseDto[];

    constructor(data) {
        super(data);
        this.website = data.website;
        this.openingHours = data.opening_hours;
        this.contact = data.contact;
        this.facilities = data.facilities;
        this.placeSource = data.placeSource;

        if (data.user) {
            this.user = new UsersResponseDto(data.user);
        }

        this.comments = data.comments?.length
            ? data.comments.map(comment => new CommentResponseDto(comment))
            : [];

        this.likes = data.likes?.length
            ? data.likes.map(like => new PlaceLikeResponseDto(like))
            : [];
    }
}
