import {Module} from '@nestjs/common';

import {UsersApiModule} from './users/users.module';
import {AuthApiModule} from '@api/auth/auth.module';
import {PlacesApiModule} from '@api/place/place.module';
import {CommentsApiModule} from '@api/comments/comments.module';

@Module({
    imports: [
        UsersApiModule,
        AuthApiModule,
        PlacesApiModule,
        CommentsApiModule
    ]
})
export class ApiModule {
}
