import { ImageResponse } from './ImageResponse';
import { Address } from './Address';

export class Search {
    unitOfferValuation: string;
    images: any | ImageResponse[];
    name: string;
    oid: string;
    totalOfferValuation: string;
    desire?: string;
    location: Address;
}

export class SearchCategory {
    categoryId: string;
    label?: string;
    children?: SearchCategory[];
}

export interface SearchSuggestion {
    categoryId?: string;
    imagePath?: string;
    label?: string;
    name?: string;
    vertical?: RootCategory;
    searchText? : string;
    categoryName?: string;
    thumbnail?: string;
    title?: string;
    verticalName?: string;
}

export interface RootCategory {
    categoryId?: string;
    label?: string;
}