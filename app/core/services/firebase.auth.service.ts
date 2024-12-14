import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { FirebaseBusinessClaims, SupportedFireBaseClaims } from '@gintaa/core/models/firebase-claims';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { UserOnlineStatus } from '@gintaa/shared/models';
import { environment } from '@gintaa/env';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    user: any;
    signInConfirmationResultSub: BehaviorSubject<any> = new BehaviorSubject(null);
    public firebaseAuthError = new Subject<string>();
    firebaseAuthError$ = this.firebaseAuthError.asObservable();
    loggedInUserInfo = new Subject<any>();

    constructor(
        public fireAuth: AngularFireAuth,
        private authService: AuthService,
        private chatService: ChatService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    async signInWithPhoneNumber(phoneNumber: string): Promise<firebase.auth.ConfirmationResult> {
        const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: 'invisible'
        });
        const confirmationRes = await this.fireAuth.signInWithPhoneNumber(phoneNumber, applicationVerifier);
        return confirmationRes;
    }

    async signInWithEmailAndPassword(email: string, password: string): Promise<any> {
        const result = await this.fireAuth.signInWithEmailAndPassword(email, password);
        return result;
    }

    async signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await this.fireAuth.signInWithPopup(provider);
        return result;
    }

    async signInWithFacebook() {
        const result = await this.fireAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        return result;
    }

    async createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
        const result = await this.fireAuth.createUserWithEmailAndPassword(email, password);
        return result;
    }

    signOut() {
        return this.chatService.setOfflineOnlineStatus(UserOnlineStatus.offline)
            .pipe(
                map((res)=>{
                    // console.log(res);
                    this.chatService.initialize();
                    return from(this.fireAuth.signOut())
                }),
                catchError((error, obs) => {
                    // console.error('logout failed, error:', error);
                    this.chatService.initialize();
                    return from(this.fireAuth.signOut());
                })
            );
    }

    ///////////////////// Start for settings ///////////////////    
    

    async passwordResetEmailSend(email: string){
        // , { url: 'http://localhost:4200/settings/authirization/reset-password' }
        const sendMail = await this.fireAuth.sendPasswordResetEmail(email);

        

        // var phone = "+919876543210";
        // const updatePhone = await user.updatePhoneNumber(phone).then(function() {
        //     // Update successful.
        //     console.log('phpne number Update successful');
        // }).catch(function(error) {
        //     // An error happened.
        //     console.log('phone Update error', error);
        // });

          
        return sendMail;
    }

    async confirmResetPassword(code: string, password: string){
        const confirmReset = await this.fireAuth.confirmPasswordReset(code, password);
        // console.log('confirmReset:', confirmReset);
        return confirmReset;
    }

    async confirmUpdatePassword(password: string){
        const confirmUpdate = await firebase.auth().currentUser.updatePassword(password);
        // console.log('confirmUpdate:', confirmUpdate);
        return confirmUpdate;
    }

    async confirmUpdateEmail(newEmail: string){
        var user = firebase.auth().currentUser;
        // console.log('current-user:', user);       

        const updateEmail = await user.updateEmail(newEmail);
        return updateEmail;
    }

    async reauthenticateWithEmailPassword(userEmail: string, userPassword: string) {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            userEmail, 
            userPassword
        );
        // Now you can use that to reauthenticate
        const reAuthenticate = await user.reauthenticateWithCredential(credential);
        // console.log('reAuthenticate:', reAuthenticate);
        return reAuthenticate;
    }

    async updateDisplayName(displayName: string = '', photoURL: string = '') {

        let reqObj: { displayName?: string, photoURL?: string } = {};

        if (displayName) {
            reqObj.displayName = displayName
        }

        if (photoURL) {
            if(photoURL == 'remove'){
                reqObj.photoURL = '';
            } else{
                reqObj.photoURL = photoURL
            }
        }

        if (displayName || photoURL) {
            const user = await firebase.auth().currentUser;
            if (user) {
                await firebase.auth().currentUser.getIdToken(true).then(function(idToken:any) {
                    if(idToken){
                        this.authService.updateFirebaseUserToken(idToken)
                     }
                  }).catch(function(error) {
                    // console.log(error)
                  });
                user.updateProfile(reqObj).then(() => {
                    const usertemp = firebase.auth().currentUser;
                    if (usertemp != null) {
                        this.authService.setUsername(usertemp.displayName);
                        this.authService.setProfileImage(usertemp.photoURL);
                        this.updateUserInfo({displayName: usertemp.displayName, photoURL: usertemp.photoURL})
                    }
                })
            }
        }
    }

    updateUserInfo(userInfo:any) {
        this.loggedInUserInfo.next(userInfo);
    }

    async updateToken() {
        const user = await firebase.auth().currentUser.getIdToken(true).then(function(idToken:any) {
            if(idToken){
                this.authService.updateFirebaseUserToken(idToken)
            }
        }).catch(function(error) {
        });
    }

    async updateClaimsForUser(userIdentifier: string = '') {
        const currentUser = await firebase.auth().currentUser;
        if (currentUser) {
            let availableClaimes = await (await currentUser.getIdTokenResult()).claims;
            if (availableClaimes) {

                const businessRoles: FirebaseBusinessClaims[] = availableClaimes.business_roles;
                if (businessRoles && businessRoles.length > 0) {
                    const chooseBusinessRole = businessRoles[0].businessRole;

                    if (chooseBusinessRole === SupportedFireBaseClaims.BUSINESS_ADMIN) {
                        this.authService.setFirebaseClaimForUser(SupportedFireBaseClaims.BUSINESS_ADMIN, true, businessRoles);
                    } else if (chooseBusinessRole === SupportedFireBaseClaims.BUSINESS_USER) {
                        this.authService.setFirebaseClaimForUser(SupportedFireBaseClaims.BUSINESS_USER, true, businessRoles);
                    } else if (chooseBusinessRole === SupportedFireBaseClaims.BUSINESS_OWNER) {
                        this.authService.setFirebaseClaimForUser(SupportedFireBaseClaims.BUSINESS_OWNER, true, businessRoles);
                    } else {
                        // SHOULD NOT HAPPEM
                        // console.log('%c [BUSINESS MODE] current role is not supported:' + chooseBusinessRole, 'background: #FF5733; color: #DAF7A6');
                    }
                }

                // TODO: NEED TO REMOVE THIS LATER ON
                if (userIdentifier === '+917797911115' || userIdentifier === 'sdh50@yopmail.com') {
                    // console.log('%c[ACTIVATING BUSINESS MODE]', 'background: #FF5733; color: #DAF7A6')
                    const activeBusiness = [{
                        businessId:"2sVZUQxhW3udaG4pFtW6Oc",
                        businessRole: 'OWNER',
                        active: false,
                        logo:"assets/images/business/company-logo.svg",
                        name:"ABCDinfotech",
                        color:"#6b9c2e",
                        activated: true
                    }];
                    this.authService.setFirebaseClaimForUser(SupportedFireBaseClaims.BUSINESS_OWNER, true, activeBusiness);
                }
            }
        }
    }

    ///////////// Start Auth sign in with email link ////////////

    async firebaseSignInEmailSend(email: string = '') {
        if (isPlatformBrowser(this.platformId)) {
            const redirectUrl   = window.location.href;
            // const loginUrl      = window.location.origin + '/signin-email-link-verify?redirectTo='+redirectUrl;

            const loginUrl      = window.location.origin + '/signin-email-link-verify';

            var actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                // url: 'https://www.example.com/finishSignUp?cartId=1234',
                url: loginUrl,
                // This must be true.
                handleCodeInApp: true,
                                
                iOS: {
                  bundleId: environment.dynamicLinkConfig.iosBundleId, //'com.asconsoft.gintaa.dev'
                },
                android: {
                  packageName: environment.dynamicLinkConfig.androidPackageName, //'com.asconsoft.gintaa.dev',
                  installApp: true,
                  minimumVersion: environment.dynamicLinkConfig.minimumVersion //'12'
                },
                dynamicLinkDomain: environment.dynamicLinkConfig.dynamicLinkDomain //'devlinks.gintaa.com'
            };

            let mailSend = await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)

            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignInGintaa', email);
                return {
                    "success": true,
                    "code": 200,
                    "message": "The link was successfully sent",
                    "payload": []
                };
            })
            .catch((error) => {
                return {
                    "success": false,
                    "code": 404,
                    "message": error.message,
                    "payload": error
                };
            });

            return mailSend;
        } else {
            return {
                "success": false,
                "code": 404,
                "message": 'Cannot send email from firebase',
                "payload": ''
            };
        }
    }

    async firebaseSignInWithEmailLink(email: string = '', link: string = '') {
        let signInResp: any;

        if (email !== '' && link !== '') {
            signInResp = this.fireAuth.signInWithEmailLink(email, link)
              .then((result) => {
                if (isPlatformBrowser(this.platformId)) {
                    window.localStorage.removeItem('emailForSignInGintaa');
                }

                return {
                    "success": true,
                    "code": 200,
                    "message": "Sign in successfull",
                    "isNewUser": result.additionalUserInfo.isNewUser,
                    "payload": result
                };
              })
              .catch((error) => {
                return {
                    "success": false,
                    "code": 404,
                    "message": error.message,
                    "payload": error
                };
            });
        } else {
            signInResp =  {
                "success": false,
                "code": 404,
                "message": 'Email or authentication link is missing',
                "payload": []
            };
        }

        return signInResp;
    }

}
