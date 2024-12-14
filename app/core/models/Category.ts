export interface Category {
    categoryId?: string;
    type?: string;
    label?: string;
    description?: string;
    leafNode?: boolean;
    breadcrumbs?: string[];
    hierarchy?: CategoryHierarchy[];
    tags?: CategoryTags[];
    vertical?: CategoryVertical;
    synonyms?: string[];
    imagePath?: string;
    fullSearchScore?: string;
    completionSearchScore?: string;
    seoId?: string;
    url?: string;
    children?: string[];
}

export interface Vertical {
    createdBy: string;
    createdDate: string;
    description: string;
    label: string;
    name: string;
    seoId: string;
    status: string;
    url: string;
    verticalId: string;
}

export interface CategoryHierarchy {
    categoryId?: string;
    label?: string;
}

export interface CategoryTags {
    tagId?: string;
    name?: string;
    description?: string;
    label?: string;
    values?: string[];
    allowCompletionSearch?: boolean,
    allowFullSearch?: boolean
}

export interface CategoryVertical {
    id?: string;
    label?: string;
}