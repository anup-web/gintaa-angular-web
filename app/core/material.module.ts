import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatVideoModule } from 'mat-video';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatRadioModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatVideoModule,
        MatTimepickerModule,
        MatSliderModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatButtonModule,
        MatTabsModule,
        MatToolbarModule
    ],
    exports: [
        CommonModule,
        MatInputModule,
        MatRadioModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatVideoModule,
        MatTimepickerModule,
        MatSliderModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatButtonModule,
        MatTabsModule,
        MatToolbarModule
    ]
  })
export class MaterialModule { }
