import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RazorpayPaymentState } from "../models/gintaa-payment.model";

export const selectPaymentState = createFeatureSelector<RazorpayPaymentState>(
  "gintaaPayment"
);

export const selectProcessingStatus = createSelector(
  selectPaymentState,
  (payment) => payment.paymentInitiatedWithOrderId
);
