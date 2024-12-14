import { createAction, props } from "@ngrx/store";
import { PAYMENT_ACTION_TYPE } from "../configs/gintaa-payment.config";
import {
  PaymentInformation,
  RazorpayErrorDetails,
  RazorPayOrderProcessingDetails,
  RazorPayOrderSuccessDetails,
} from "../models/gintaa-payment.model";

export const paymentInitiated = createAction(
  PAYMENT_ACTION_TYPE.PAYMENT_INITIATED,
  props<{
    input: PaymentInformation;
  }>()
);

export const paymentInitiatedWithOrderId = createAction(
  PAYMENT_ACTION_TYPE.PAYMENT_INITIATED_ORDER_ID,
  props<{
    input: RazorPayOrderProcessingDetails;
  }>()
);

export const paymentSuccess = createAction(PAYMENT_ACTION_TYPE.PAYMENT_SUCCESS);

export const paymentFailure = createAction(
  PAYMENT_ACTION_TYPE.PAYMENT_FAILURE,
  props<{
    error: RazorpayErrorDetails;
  }>()
);

export const razorPayIdgeneratedAfterSuccess = createAction(
  PAYMENT_ACTION_TYPE.PAYMENT_RAZORPAY_ID_GENERATED,
  props<{
    input: RazorPayOrderSuccessDetails;
  }>()
);

export const clearPaymentError = createAction(
  PAYMENT_ACTION_TYPE.CLEAR_PAYMENT_ERROR
);
