import {FilesInterceptor} from '@nestjs/platform-express';
import {Injectable} from '@nestjs/common';
import {diskStorage} from 'multer';

import {imageFileName} from '@common/utils/image.file.name';
import {imageFileFilter} from '@common/filters/image.filter';

@Injectable()
export class FilesLoaderInterceptor extends FilesInterceptor(
    'files',
    5,
    {
        storage: diskStorage({
            destination: './files',
            filename: imageFileName
        }),
        fileFilter: imageFileFilter
    }
) {
}
