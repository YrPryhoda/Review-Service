import {
    BadRequestException,
    UseInterceptors,
    UploadedFiles,
    Controller,
    UseGuards,
    HttpCode,
    Delete,
    Param,
    Body,
    Post,
    Put,
    Req,
    Res,
    Get
} from '@nestjs/common';
import {StatusCodes} from 'http-status-codes';
import {Express, Response} from 'express';
import {join} from 'path';

import {PlaceNormalizedInterface} from '@entities/place/interfaces/place.normalized.interface';
import {CommentUpdateRequestDto, CommentRequestDto, CommentResponseDto} from '@dtos/comments';
import {FilesLoaderInterceptor} from '@common/interceptors/FilesLoaderInterceptor';
import {CommentLikeService} from '@entities/comment/like/comment.like.service';
import {CommentLikeRequestDto} from '@dtos/comments/like/like.request.dto';
import {CommentService} from '@entities/comment/comment.service';
import {JwtAuthGuard} from '@common/guards/auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentService,
        private commentsLikeService: CommentLikeService
    ) {
    }

    @Get('files/:path')
    async getFiles(
        @Param('path') path: string,
        @Res() res: Response
    ) {
        return res.sendFile(join(process.cwd(), 'files', path));
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(StatusCodes.CREATED)
    @UseInterceptors(FilesLoaderInterceptor)
    async createComment(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() data: CommentRequestDto
    ): Promise<PlaceNormalizedInterface> {
        try {
            return await this.commentsService.createComment(data, files);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put(':commentId')
    @UseGuards(JwtAuthGuard)
    @HttpCode(StatusCodes.CREATED)
    async updateComment(
        @Body() data: CommentUpdateRequestDto,
        @Req() req,
        @Param() params
    ): Promise<PlaceNormalizedInterface> {
        try {
            const {id} = req.user;
            const {commentId} = params;

            return await this.commentsService.updateComment(id, commentId, data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Post('like')
    @UseGuards(JwtAuthGuard)
    @HttpCode(StatusCodes.CREATED)
    async createLike(@Req() req, @Body() body: CommentLikeRequestDto) {
        const {id} = req.user;
        const {commentId} = body;

        return this.commentsLikeService.createLike(id, commentId);
    }

    @Delete(':commentId')
    @UseGuards(JwtAuthGuard)
    @HttpCode(StatusCodes.OK)
    async deleteComment(
        @Req() req,
        @Param('commentId') commentId: number
    ): Promise<CommentResponseDto> {
        const {id} = req.user;
        const deletedComment = await this.commentsService.delete(id, commentId);

        return new CommentResponseDto(deletedComment);
    }
}
