import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/config/api-urls.config';

// import { LoggerService } from '@gintaa/core/services/logger.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AddressResponse } from '@gintaa/core/models';
import { BusinessTeam } from '../models/BusinessState.model';
import { StorageService } from '@gintaa/core/services/storage.service';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class BusinessService {
    constructor(
        private httpClient: HttpClient,
        private storageService: StorageService,
    ) {}

    genericResponse = {
        success: true,
        message: 'Fetch Successfull',
        status: 200,
        payload: []
    }

    fetchBusinessProfilesMock() {
        return of({
            success: true,
            message: 'Fetch Successfull',
            status: 200,
            payload: [
                {
                    businessId: '1',
                    logo: 'assets/images/business/company-logo.svg',
                    name: 'ABCDinfotech',
                    color: '#6b9c2e',
                    status: 'Under review',
                    activated: false
                },
                {
                    businessId: '2',
                    logo: 'assets/images/business/company-logo.svg',
                    name: 'ABCDinfotech 1',
                    color: '#48cef3',
                    status: 'Active',
                    activated: true
                },
                {
                    businessId: '3',
                    logo: 'assets/images/business/company-logo.svg',
                    name: 'ABCDinfotech 2',
                    color: '#ee2a7b',
                    status: 'Active',
                    activated: false
                },
            ]
        }).pipe(delay(1000));
    }

    fetchBusinessProfiles() {
        const requestURL = `${environment.serverUrl}${configUrls.fetchBusinessProfiles}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.httpClient.get(requestURL, { headers });
    }

    fetchBusinessInvitations() {
        const requestURL = `${environment.serverUrl}${configUrls.fetchBusinessInvitations}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.httpClient.get(requestURL, { headers });
    }

    acceptInvitation(businessId: string) {
        let requestURL = `${environment.serverUrl}${configUrls.acceptInvitation}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.httpClient.post(requestURL, null, { headers });
    }

    rejectInvitation(businessId: string, reason: string) {
        let requestURL = `${environment.serverUrl}${configUrls.rejectInvitation}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = `${requestURL}${reason}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.httpClient.post(requestURL, null, { headers });
    }

    activateBusinessProfile() {
        return of({
            ...this.genericResponse
        })
    }

    deActivateBusinessProfile() {
        return of({
            ...this.genericResponse
        })
    }

    uploadBusinessCoverImageMock(formData: any, businessId: string) {
        return of({
            ...this.genericResponse
        })
    }

    uploadBusinessLogoMock(formData: any, businessId: string) {
        return of({
            ...this.genericResponse
        })
    }

    uploadBusinessCoverImage(formData: any, businessId: string) {
        let requestURL = `${environment.serverUrl}${configUrls.uploadBusinessCoverImage}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        return this.httpClient.post<Response>(
            requestURL,
            formData, {
                reportProgress: true,
                observe: 'events'
            }
        )
    }

    uploadBusinessLogo(formData: any, businessId: string) {
        let requestURL = `${environment.serverUrl}${configUrls.uploadBusinessLogo}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        return this.httpClient.post<Response>(
            requestURL,
            formData, {
                reportProgress: true,
                observe: 'events'
            }
        )
    }

    deleteBusinessLogo(businessId: string) {
        let requestURL = `${environment.serverUrl}${configUrls.deleteBusinessLogo}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        return this.httpClient.delete<Response>(requestURL);
    }

    updateBusinessColor(businessId: string, color: string) {
        let requestURL = `${environment.serverUrl}${configUrls.updateBusinessColor}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = `${requestURL}?colourCode=${encodeURIComponent(color)}`
        return this.httpClient.post<Response>(requestURL, {});
    }

    fetchBusinessDetailsMock(businessId: string) {
        return of({
            success: true,
            message: 'Fetch Successfull',
            status: 200,
            payload: {
                businessId: '1',
                name: 'ABC Company',
                coverImage: 'assets/images/bg/boffer-topbg.svg',
                logo: 'assets/images/business/company-logo.svg',
                brandColor: 'ABCDinfotech',
                color: '#6b9c2e',
                cin: '523645780000001',
                gst: 'ABCD123456',
                rating: '4.1',
                votes: 124,
                contactInfo: {
                    phone: '9874399180',
                    mobile: '7654321098',
                    email: 'sdh@gintaa.com'
                },
                businessTeam: [
                    { name: 'Soumyadip' },
                    { name: 'Rickdev' },
                    { name: 'Mithun' },
                    { name: 'Sofikul' },
                    { name: 'Manish' },
                    { name: 'Rajib' },
                ],
                url: 'MyBusinessURL',
                description: 'Tell some thoughts about your business',
                address: [
                    {
                        addressLine: 'Kolkata, 31 b,camac Street, Salt Lake',
                        lat: 22.63982,
                        lng: 88.3819335,
                        flatNo: '3B',
                        landmark: 'Baranagar',
                        area: 'Salt Lake sector 5',
                        annotation: 'Corporate office',
                        addressTtile: 'First office',
                        zip: '700091',
                        city: 'Baranagar',
                        state: 'West Bengal',
                        country: 'India',
                        default: true
                    },
                    {
                        addressLine: 'SH 13, Daluibazar, West Bengal 713151, India',
                        lat: 23.1895121,
                        lng: 88.0286352,
                        flatNo: 'NA',
                        landmark: 'Daluibazar gate',
                        area: 'Daluibazar',
                        annotation: 'Registered office',
                        addressTtile: 'Second office',
                        zip: '71455',
                        city: 'Burdwan',
                        state: 'West Bengal',
                        country: 'India',
                        default: false
                    },
                ],
                operation: {
                    days: [
                        'Mo', 'Tu'
                    ],
                    from: '8:00 AM',
                    to: '8:00 PM'
                },
                status: 'Under review',
                activated: false
            }
        })
    }

    fetchBusinessDetails(businessId: string) {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.getBusinessDetails}`;
        requestURL = requestURL.replace('{businessId}', businessId);

        // console.log('requestURL:', requestURL);

        return this.httpClient.get(requestURL, { headers });
    }

    fetchBusinessDetailsBySlug(businessSlug: string) {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.getBusinessDetailsBySlug}`;
        requestURL = requestURL.replace('{businessSlug}', businessSlug);

        // console.log('requestURL:', requestURL);

        return this.httpClient.get(requestURL, { headers });
    }
    
    updateBusinessDetailsMock(formData: any) {
        return of({
            ...this.genericResponse
        });
    }

    updateBusinessDetails(formData: any, businessId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.updateBusiness}`;
        requestURL = requestURL.replace('{businessId}', businessId);

        // console.log('requestURL:', requestURL);

        return this.httpClient.put(requestURL, formData, { headers });
    }

    saveUserAddress(address: AddressResponse) {
        // return this.http.post<Response>(`${environment.serverUrl}${configUrls.addAddressUrl}`, address)
        return of({
            ...this.genericResponse
        });
    }


    addBusinessAddress(address: AddressResponse, businessId: string) {
        // console.log('address:', address);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.addBusinessAddress}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        return this.httpClient.post(requestURL, address, { headers });
    }

    updateBusinessAddress(address: AddressResponse, addressId: string, businessId: string) {
        // console.log('-- address:', address);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });


        let requestURL: string = `${environment.serverUrl}${configUrls.updateBusinessAddress}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = requestURL.replace('{addressId}', addressId);

        return this.httpClient.put(requestURL, address, { headers });
    }

    removeBusinessAddress(addressId: string, businessId: string) {

        // const headers = new HttpHeaders({
        //     'Content-Type': 'application/json'
        // });


        let requestURL: string = `${environment.serverUrl}${configUrls.deleteBusinessAddress}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = requestURL.replace('{addressId}', addressId);

        return this.httpClient.delete(requestURL);
    }

    fetchBusinessMembersMock(businessId: string) {
        return of({
            success: true,
            message: 'Fetch Successfull',
            status: 200,
            payload: [
                {
                    userId: '1',
                    name: 'Soumyadip Hazra',
                    status: 'active',
                    image: 'assets/images/ui.jpg',
                    role: 'member',
                    email: 'sdh@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '2',
                    name: 'Walter White',
                    status: 'active',
                    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png',
                    role: 'member',
                    email: 'Walter@gintaa.com',
                    phone: '+917799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '3',
                    name: 'Jesse Pinkman',
                    status: 'active',
                    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Jesse_Pinkman_S5B.png/220px-Jesse_Pinkman_S5B.png',
                    role: 'member',
                    email: 'Jesse@gintaa.com',
                    phone: '7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '4',
                    name: 'Gus Fring',
                    status: 'active',
                    image: 'https://upload.wikimedia.org/wikipedia/en/6/69/Gustavo_Fring_BCS_S3E10.png',
                    role: 'member',
                    email: 'Fring@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '5',
                    name: 'Skyler White',
                    status: 'invited',
                    image: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Skyler_White_S5B.png',
                    role: 'manager',
                    email: 'Skyler@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '6',
                    name: 'Jane Margolis',
                    status: 'invited',
                    image: 'https://i.pinimg.com/600x315/e0/3e/6e/e03e6e615ecc75e6f75f0dee1ad09906.jpg',
                    role: 'member',
                    email: 'Margolis@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '7',
                    name: 'Mike Ehrmantraut',
                    status: 'invited',
                    image: 'https://upload.wikimedia.org/wikipedia/en/e/ea/Mike_Ehrmantraut_BCS_S3.png',
                    role: 'member',
                    email: 'Ehrmantraut@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '8',
                    name: 'Hector Salamanca',
                    status: 'invited',
                    image: 'https://i.pinimg.com/474x/6b/27/da/6b27dae4c609df261dde7e15e6221521.jpg',
                    role: 'member',
                    email: 'Hector@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '9',
                    name: 'Saul Goodman',
                    status: 'invited',
                    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Jimmy_McGill_BCS_S3.png/220px-Jimmy_McGill_BCS_S3.png',
                    role: 'member',
                    email: 'Goodman@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '10',
                    name: 'Tuco Salamanca',
                    status: 'invited',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Raymond_Cruz_February_2015.jpg/1200px-Raymond_Cruz_February_2015.jpg',
                    role: '',
                    email: 'Salamanca@gintaa.com',
                    phone: '',
                    invitedOn: '',
                    invitationSatus: 'Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '11',
                    name: 'Hank Schrader',
                    status: 'rejected',
                    image: 'https://tvline.com/wp-content/uploads/2020/02/breaking-bad-hank-dean-norris.jpg?w=620',
                    role: 'member',
                    email: 'sdh@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '12',
                    name: 'Skinny Pete',
                    status: 'rejected',
                    image: 'https://i.redd.it/cult942kqms31.jpg',
                    role: 'member',
                    email: 'sdh@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '13',
                    name: 'Krazy-8',
                    status: 'rejected',
                    image: 'https://www.cheatsheet.com/wp-content/uploads/2020/02/Krazy-8.jpg',
                    role: 'member',
                    email: 'sdh@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '14',
                    name: 'Don Eladio',
                    status: 'rejected',
                    image: '',
                    role: 'member',
                    email: 'sdh@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '15',
                    name: 'Huell Babineaux',
                    status: 'active',
                    image: 'https://pbs.twimg.com/profile_images/378800000438999607/aa04af822e6f9b56faea454f9e300dbd.jpeg',
                    role: 'member',
                    email: 'sdh@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '16',
                    name: 'Tortuga',
                    status: 'active',
                    image: 'https://images.amcnetworks.com/blogs.amctv.com/wp-content/uploads/2010/09/BB-Danny-Trejo-325.jpg',
                    role: 'member',
                    email: 'sdh@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                },
                {
                    userId: '17',
                    name: 'Steven Gomez',
                    status: 'active',
                    image: 'http://i.imgur.com/PTvVbeB.png',
                    role: 'member',
                    email: 'sdh@gintaa.com',
                    phone: '+91 7799911223',
                    invitedOn: '19/03/2021',
                    invitationSatus: 'Not Accepted',
                    invitationMessage: 'Your invitation status'
                }
            ]
        }).pipe(delay(1500));
    }

    fetchBusinessMembers(businessId: string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.getAllMembers}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        return this.httpClient.get(requestURL, { headers });
    }

    updateBusinessMemberMock(member: BusinessTeam) {
        return of({
            ...this.genericResponse
        });
    }

    updateBusinessMember(businessId: string, memmberId: string, selectedRoleId: string ) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.updateBusinessMemberRole}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = requestURL.replace('{memberId}', memmberId);
        requestURL = requestURL.replace('{roleId}', selectedRoleId);
        return this.httpClient.put(requestURL, { headers });
    }

    removeBusinessMemberMock(member: BusinessTeam) {
        return of({
            ...this.genericResponse
        });
    }

    removeBusinessMember(member: BusinessTeam) {
        // 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let businessId  = member.businessProfileId;
        let memberId    = member.memberId;
        let reason      = '';

        let requestURL: string = `${environment.serverUrl}${configUrls.removeBusinessMember}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = requestURL.replace('{memberId}', memberId);
        requestURL = requestURL.replace('{reason}', reason);
        return this.httpClient.put(requestURL,{ headers });
    }

    addBusinessMemberMock(member: BusinessTeam) {
        return of({
            ...this.genericResponse
        });
    }

    addBusinessMember(members: any[], businessId: string ) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.inviteMembers}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        return this.httpClient.post(requestURL, members, { headers });
    }

    getAllBusinessRoles(businessId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.getAllBusinessRoles}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        return this.httpClient.get(requestURL, { headers });

    }

    removeInvitationMock(memberId: string) {
        return of({
            ...this.genericResponse
        });
    }

    removeInvitation(memberId: string, businessId: string, invitationType: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        if(invitationType === 'rejected') {
            // Remove rejected invitation
            let requestURL: string = `${environment.serverUrl}${configUrls.removeRejectedInvitation}`;
            // requestURL = requestURL.replace('{businessId}', businessId);
            requestURL = requestURL.replace('{deniedId}', memberId);
            return this.httpClient.delete(requestURL, { headers: headers });

        } else {
            // Remove invitation
            let requestURL: string = `${environment.serverUrl}${configUrls.deleteBusinessInvitation}`;
            requestURL = requestURL.replace('{businessId}', businessId);
            requestURL = requestURL.replace('{memberRequestIds}', memberId);
            return this.httpClient.delete(requestURL, { headers: headers });
        }
    }

    resendInvitation(memberId: string, businessId: string, message: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.resendMemberInvitation}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = requestURL.replace('{comments}', message);

        let memberIds = [memberId];
        return this.httpClient.post(requestURL, memberIds, { headers: headers });
    }

    fetchBusinessMemberDetailsMock(businessId: string, memberId: string) {
        return of({
            success: true,
            message: 'Fetch Successfull',
            status: 200,
            payload: {
                userId: '1',
                name: 'Soumyadip Hazra',
                status: 'active',
                image: 'assets/images/ui.jpg',
                role: 'owner',
                email: 'sdh@gintaa.com',
                phone: '+91 7799911223',
                invitedOn: '19/03/2021',
                invitationSatus: 'Not Accepted',
                invitationMessage: 'Your invitation status',
                offers: [
                    {
                        offerId: 1,
                        name: 'HP Laptop',
                        tag: 'Laptop, Electronics',
                        image: 'assets/pro/54.jpg',
                        location: 'Bidhanagar',
                        desc: `LT 01 is a luxurious interpretation of the classic tennis
                        sneaker, featuring a premium nappa leather upper, a layered
                        leather insole, leather, also it can be helpful for sprint
                        running and .....`
                    },
                    {
                        offerId: 2,
                        name: 'Captain Coons Watches',
                        tag: 'Phone, Laptop',
                        image: 'assets/pro/31.jpg',
                        location: 'kolkata',
                        desc: `LT 01 is a luxurious interpretation of the classic tennis
                        sneaker, featuring a premium nappa leather upper, a layered
                        leather insole, leather, also it can be helpful for sprint
                        running and .....`
                    },
                    {
                        offerId: 3,
                        name: 'Plastic Bottles',
                        tag: 'Mobile, Laptop',
                        image: 'assets/pro/32.jpg',
                        location: 'Bidhanagar',
                        desc: `LT 01 is a luxurious interpretation of the classic tennis
                        sneaker, featuring a premium nappa leather upper, a layered
                        leather insole.`
                    },
                    {
                        offerId: 4,
                        name: 'Desk Calender',
                        tag: 'Mobile, Laptop',
                        image: 'assets/pro/39.jpg',
                        location: 'Bidhanagar',
                        desc: `LT 01 is a luxurious interpretation of the classic tennis
                        sneaker, featuring a premium nappa leather upper, a layered
                        leather insole, leather, also it can be helpful for sprint
                        running and .....`
                    }
                ]
            }
        });
    }

    fetchBusinessMemberDetails(businessId: string, memberId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.getMemberDetails}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = requestURL.replace('{memberId}', memberId);
        return this.httpClient.get(requestURL, { headers: headers });
    }

    updateMemberActivationStatus(memberId: string, businessId: string, activationStatus: boolean) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestURL: string = `${environment.serverUrl}${configUrls.activeInactiveMember}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = requestURL.replace('{memberId}', memberId);
        requestURL = requestURL.replace('{activeStatus}', ''+activationStatus);
        return this.httpClient.put(requestURL, { headers: headers });
    }

    fetchBusinessOffersMock(businessId: string) {
        return of({
            success: true,
            message: 'Fetch Successfull',
            status: 200,
            payload: [
                {
                    offerId: 1,
                    name: 'HP Laptop',
                    tag: 'Laptop, Electronics',
                    image: 'assets/pro/54.jpg',
                    location: 'Bidhanagar',
                    desc: `LT 01 is a luxurious interpretation of the classic tennis
                    sneaker, featuring a premium nappa leather upper, a layered
                    leather insole, leather, also it can be helpful for sprint
                    running and .....`,
                    user: {
                        name: 'Soumyadip Hazra',
                        image: 'assets/images/ui.jpg',
                        role: 'member'
                    }
                },
                {
                    offerId: 2,
                    name: 'Captain Coons Watches',
                    tag: 'Phone, Laptop',
                    image: 'assets/pro/31.jpg',
                    location: 'kolkata',
                    desc: `LT 01 is a luxurious interpretation of the classic tennis
                    sneaker, featuring a premium nappa leather upper, a layered
                    leather insole, leather, also it can be helpful for sprint
                    running and .....`,
                    user: {
                        name: 'Walter White',
                        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png',
                        role: 'member'
                    }
                },
                {
                    offerId: 3,
                    name: 'Plastic Bottles',
                    tag: 'Mobile, Laptop',
                    image: 'assets/pro/32.jpg',
                    location: 'Bidhanagar',
                    desc: `LT 01 is a luxurious interpretation of the classic tennis
                    sneaker, featuring a premium nappa leather upper, a layered
                    leather insole.`,
                    user: {
                        name: 'Jesse Pinkman',
                        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Jesse_Pinkman_S5B.png/220px-Jesse_Pinkman_S5B.png',
                        role: 'member'
                    }
                },
                {
                    offerId: 4,
                    name: 'Desk Calender',
                    tag: 'Mobile, Laptop',
                    image: 'assets/pro/39.jpg',
                    location: 'Bidhanagar',
                    desc: `LT 01 is a luxurious interpretation of the classic tennis
                    sneaker, featuring a premium nappa leather upper, a layered
                    leather insole, leather, also it can be helpful for sprint
                    running and .....`,
                    user: {
                        name: 'Soumyadip Hazra',
                        image: 'assets/images/ui.jpg',
                        role: 'member'
                    }
                }
            ]
        })
    }

    fetchBusinessOffers(page: number = 1) {
        let requestURL = `${environment.serverUrl}${configUrls.loggedInUserAllOffers}?page=${page}&sort=publishedDate`;
        if (status) {
            requestURL = `${requestURL}?status=${status}`;
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.httpClient.get(requestURL, { headers });
    }

    fetchBusinessAllPublishedOffers(businessId: string, showCompletedOffers: boolean = false) {
        let requestURL = `${environment.serverUrl}${configUrls.fetchBusinessAllPublishedOffers}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = `${requestURL}?show-completed-offers=${showCompletedOffers}`

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.httpClient.get(requestURL, { headers });
    }

    fetchBusinessOffersByIdentityId(identityId: string, states: any = null, showCompletedOffers: boolean = false) {
        let requestURL = `${environment.serverUrl}${configUrls.fetchBusinessOffersByIdentity}`;
        requestURL = requestURL.replace('{identityId}', identityId);

        if (states === 'ACTIVE') {
            requestURL = `${requestURL}?states=active`;
        } else if (states === 'DRAFT') {
            requestURL = `${requestURL}?states=draft`;
        } else {
            requestURL = `${requestURL}?states=active,under_review,rejected,hidden,draft`;
        }

        if (showCompletedOffers) {
            requestURL = `${requestURL}&show-completed-offers=${showCompletedOffers}`;
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.httpClient.get(requestURL, { headers });
    }

    fetchDealComments(businessId: string) {
        return of({
            success: true,
            message: 'Fetch Successfull',
            status: 200,
            payload: [
                {
                    displayName: 'Annah Sarah',
                    images: [
                        {
                            url: 'assets/images/ui.jpg'
                        }
                    ],
                    comment: 'The deal with Bob was very good and quick! Bob is very clever man. All the issues we had we fixed very quickly!'
                },
                {
                    displayName: 'SDH',
                    images: [
                        {
                            url: 'assets/images/ui.jpg'
                        }
                    ]
                },
                {
                    displayName: 'Annah Sarah',
                    images: [
                        {
                            url: 'assets/images/ui.jpg'
                        }
                    ],
                    comment: 'The deal with Bob was very good and quick! Bob is very clever man. All the issues we had we fixed very quickly!'
                },
                {
                    displayName: 'Steve Gomez',
                    images: [
                        {
                            url: 'assets/images/ui.jpg'
                        }
                    ],
                    comment: 'It was a very good deal..'
                }
            ]
        })
    }

    fetchBusinessSuggestedUrl(businessName: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let appendLength = '6';

        let requestURL: string = `${environment.serverUrl}${configUrls.getAllSuggestedURL}`;
        requestURL = requestURL.replace('{businessName}', businessName);
        requestURL = requestURL.replace('{appendLength}', appendLength);

        return this.httpClient.get(requestURL, { headers: headers });
    }

    delegateBusinessOffer(offerId: string, identityId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let requestBody = {
            "offerIds": [offerId],
            "identityId": identityId
        };

        let requestURL: string = `${environment.serverUrl}${configUrls.delegateBusinessOffer}`;

        return this.httpClient.post(requestURL, requestBody, { headers: headers });
    }

    getCurrentUserContactInfo() {
        let accessToken = this.storageService.getCurrentUserAccessToken();
        let decodeToken = jwt_decode(accessToken);
        return decodeToken;
    }

}
