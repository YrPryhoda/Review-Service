import {Module} from '@nestjs/common';

import {UsersApiModule} from './users/users.module';
import {AuthApiModule} from '@api/auth/auth.module';
import {PlacesApiModule} from '@api/place/place.module';
import {CommentsApiModule} from '@api/comments/comments.module';
import {PlaceChangeRequestApiModule} from '@api/request/request.module';

@Module({
    imports: [
        UsersApiModule,
        AuthApiModule,
        PlacesApiModule,
        PlaceChangeRequestApiModule,
        CommentsApiModule
    ]
})
export class ApiModule {
}
