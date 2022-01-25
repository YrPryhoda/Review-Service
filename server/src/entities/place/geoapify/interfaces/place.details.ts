export interface PlaceDetailsInterface {
    website?: string;
    // eslint-disable-next-line camelcase
    opening_hours?: string;
    contact?: string
    categories: string,
    facilities?: { [key: string]: string } | string
}
