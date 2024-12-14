export interface AddressRequest {
    name: string;
    phoneNumber: number;
    email: string;
    addressLine: string;
    lat: number;
    lng: number;
    flatNo: string;
    landmark: string;
    area: string;
    annotation: string;
    zip: string;
    city: string;
    state: string;
    country: string;
    default: false;
}