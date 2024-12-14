
export enum MatchBoxAvailableTabs {
    EXISTING_OFFER = 'existing',
    POTENTIAL_OFFER = 'potential',
}

export interface MatchBoxConfigOptions {
    lastFetchedOn: number;
    dirty: boolean;
    forceUpdate: boolean;
}

export interface MatchBoxConfig {
    existing: MatchBoxConfigOptions;
    potential: MatchBoxConfigOptions;
}

export interface FetchMatchBOxRequestObject {
    status: string;
    page: number;
    size: number;
    type: string;
    value?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
}

export interface SearchTextCategory {
    reload: boolean;
    text?: string;
    category?: string;
}

export interface MatchBoxStateCategories {
    existing: any[];
    potential: any[];
}

export interface MatchBoxState {
    loading: boolean;
    myMatchBox: MatchBoxStateCategories;
    successMessage: string;
    errorMessage: string;
    defaultOption: MatchBoxAvailableTabs;
    currentOption: MatchBoxAvailableTabs;
    maxWaitUntil: number;
    searchMatchBox: SearchTextCategory;
}