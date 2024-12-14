import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { environment } from '@gintaa/env';
import { NewAddAddressComponent } from '../add-address-popup/add-address/add-address.component';
import { NewLocationMapComponent } from '../add-address-popup/location-map/location-map.component';
import { NewUserAddressComponent } from '../add-address-popup/user-address/user-address.component';

@NgModule({
    declarations: [
        NewAddAddressComponent,
        NewLocationMapComponent,
        NewUserAddressComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatRadioModule,
        AgmCoreModule.forRoot({
            apiKey: environment.googleApiKey,
            libraries: ['places']
        }),
    ]
})
export class AddAddressPopUpModule { }
