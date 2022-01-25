export interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt?: Date;
}

export interface UserInputInterface extends Omit<UserInterface, 'id'> {
    password: string;
}

export interface UserAuthInterface extends Pick<UserInterface, 'email'> {
    password: string;
}

export interface UserEditForm extends Omit<UserInterface, 'id'> {
    password?: string;
}

export interface ImageInterface {
    id: number;
    url: string;
    createdAt: Date;
}

export interface CommentInterface {
    id: string;
    user: UserInterface;
    place: PlaceInterface;
    likes: LikeInterface[] | [];
    title: string;
    content: string;
    rating: number;
    images?: ImageInterface[];
    createdAt?: Date;
}

export interface CommentEditInterface {
    id?: string;
    rating: number;
    content: string;
    title: string;
}

export interface CommentInputInterface {
    userId: string;
    placeId: string;
    title: string;
    content: string;
    rating: number;
    images: FileList | null | [];
}

export interface PlaceInterface {
    id: string;
    name: string;
    houseNumber?: string;
    street: string;
    city: string;
    lon?: number;
    lat?: number;
    website?: string;
    formatted: string;
    addressLine2: string;
    resultType?: string;
    importance?: number;
    popularity?: number;
    matchType?: string;
    image?: string;
    categories: string;
    facilities?: string | { [key: string]: string | boolean };
    contact?: string | { [key: string]: string | string[] };
    user?: UserInterface;
    comments?: CommentInterface[];
    likes?: LikeInterface[] | [];
}

export interface PlaceInputInterface extends Omit<PlaceInterface, 'id' | 'formatted' | 'addressLine2' | 'user' | 'comments'> {
    userId: string;
}

export interface LikeInterface {
    id: number;
    user: UserInterface;
    createdAt: Date;
}
