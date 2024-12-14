import {Image} from './Image';
import {Address} from './Address';
export class UserInfo {
    otp: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mblNo: string;
    mobile: string;
    dob: string;
    age: string;
    sex: string;
    images: Array<Image>;
    address: Array<Address>;
}
