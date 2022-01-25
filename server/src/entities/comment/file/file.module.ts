import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {FileService} from '@entities/comment/file/file.service';
import {FileRepository} from './file.repository';

@Module({
    providers: [FileService],
    imports: [
        TypeOrmModule.forFeature([FileRepository])
    ],
    exports: [FileService]
})
export class FileEntityModule {
}
