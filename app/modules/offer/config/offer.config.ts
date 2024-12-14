import { ServiceDays } from "@gintaa/shared/models/offer";


export const availableServiceDays: ServiceDays[] = [
    { prefix: 'Su', dayOfWeek: 'Sunday'},
    { prefix: 'Mo', dayOfWeek: 'Monday'},
    { prefix: 'Tu', dayOfWeek: 'Tuesday'},
    { prefix: 'We', dayOfWeek: 'Wednesday'},
    { prefix: 'Th', dayOfWeek: 'Thursday'},
    { prefix: 'Fr', dayOfWeek: 'Friday'},
    { prefix: 'Sa', dayOfWeek: 'Saturday'}
]

export enum AVAILBLE_OFFER_STAGE {
    DRAFT = 'Draft',
    NEW = 'New',
    UNDER_REVIEW = 'Review',
    REJECTED = 'Rejected',
    PUBLISHED = 'Published',
    HIDDEN = 'Hidden',
    INACTIVE = 'Inactive',
    COMPLETED = 'Completed'
}

export enum OFFER_DESIRE_TYPE {
    ANYTHING = 'Anything',
    ITEM = 'Item',
    SERVICE = 'Service',
    MONEY = 'Money',
}
