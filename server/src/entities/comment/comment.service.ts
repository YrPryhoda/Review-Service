import {BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {PlaceNormalizedInterface} from '@entities/place/interfaces/place.normalized.interface';
import {CommentRequestDto, CommentResponseDto, CommentUpdateRequestDto} from '@dtos/comments';
import {CommentInputInterface} from '@entities/comment/interfaces/comment.interface';
import {CommentRepository} from '@entities/comment/comment.repository';
import {PlacesService} from '@entities/place/place.service';
import {UsersService} from '@entities/user/users.service';
import {Express} from 'express';
import {FileService} from '@entities/comment/file/file.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentRepository)
        private commentRepository: CommentRepository,
        private userService: UsersService,
        private fileService: FileService,
        @Inject(forwardRef(() => PlacesService)) private placeService: PlacesService
    ) {
    }

    async findCommentById(id: number) {
        return this.commentRepository.findOne({id});
    }

    async findCommentsByExternalPlaceId(id: string) {
        return await this.commentRepository.findByExternalPlaceId(id);
    }

    async createComment(data: CommentRequestDto, files: Array<Express.Multer.File>): Promise<PlaceNormalizedInterface> {
        const {userId, placeId, ...comment} = data;
        const user = await this.userService.getUserById(userId);

        const place = await this.placeService.getPlaceById(placeId);
        if (!user || !place) {
            throw new NotFoundException();
        }

        const newComment: CommentInputInterface = place.placeSource === 'geoapify'
            ? {...comment, user, externalPlaceId: place.id}
            : {...comment, user, place};

        const createdComment = await this.commentRepository.save(newComment);

        if (files.length) {
            const filesToSave = files.map(file => ({
                comment: createdComment,
                url: file.filename
            }));
            await this.fileService.upload(filesToSave);
        }
        return await this.placeService.getPlaceById(placeId);
    }

    async updateComment(userId: string, commentId: number, data: CommentUpdateRequestDto): Promise<any> {
        const comment = await this.commentRepository.findCommentById(commentId);

        if (!comment) {
            throw new NotFoundException();
        }

        if (comment.user.id !== userId) {
            throw new BadRequestException();
        }

        await this.commentRepository.update({id: commentId}, data);
        const updatedComment = await this.commentRepository.findCommentById(commentId);
        return new CommentResponseDto(updatedComment);
    }

    async delete(userId: string, commentId: number) {
        const comment = await this.commentRepository.findCommentById(commentId);
        if (comment.user.id !== userId) {
            throw new BadRequestException();
        }

        await this.commentRepository.delete(commentId);
        return comment;
    }
}
