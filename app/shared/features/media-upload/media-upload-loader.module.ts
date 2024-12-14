import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SpinnerComponent } from "@gintaa/shared/components/loader/spinner/spinner.component";

@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  imports: [],
  exports: [
    SpinnerComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class MediaUploadLoaderModule { }
