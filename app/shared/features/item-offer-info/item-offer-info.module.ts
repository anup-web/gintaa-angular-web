import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { OfferAllCategoriesModule } from '../offer-all-categories';
import { ItemOfferInfoComponent } from './item-offer-info.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxMatDatetimePickerModule, 
  NgxMatNativeDateModule, 
  NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';
import { DirectiveModule } from '@gintaa/shared/directives/directive.module';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';

@NgModule({
  declarations: [
    ItemOfferInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,    
    OfferAllCategoriesModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatTooltipModule,
    MatIconModule,
    DirectiveModule,
    PipesModule,
  ],
  exports: [
    ItemOfferInfoComponent,
  ]
})
export class ItemOfferInfoModule { }
