import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';

import {FileRepository} from '@entities/comment/file/file.repository';
import {FileInputInterface} from '@entities/comment/file/interfaces/file.interface';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileRepository) private fileRepository: FileRepository
    ) {
    }

    async upload(files: FileInputInterface[]) {
        return this.fileRepository.save(files);
    }
}
