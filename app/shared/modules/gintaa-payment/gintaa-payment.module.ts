import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GintaaPaymentComponent } from "./components/gintaa-payment/gintaa-payment.component";
import { StoreModule } from "@ngrx/store";
import { gintaaPaymentReducer } from "./store/gintaa-payment.reducer";
import { EffectsModule } from "@ngrx/effects";
import { GintaaPayEffects } from "./store/gintaa-payment.effects";

@NgModule({
  declarations: [GintaaPaymentComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature("gintaaPayment", gintaaPaymentReducer),
    EffectsModule.forFeature([GintaaPayEffects]),
  ],
  exports: [GintaaPaymentComponent],
})
export class GintaaPaymentModule {}
