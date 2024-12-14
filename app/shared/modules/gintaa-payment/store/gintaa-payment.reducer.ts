import { Action, createReducer, on } from "@ngrx/store";
import {
  PaymentInformation,
  RazorPayOrderProcessingDetails,
  RazorPayOrderSuccessDetails,
  RazorpayPaymentState,
} from "../models/gintaa-payment.model";
import { PaymentActions } from "./actions-type";

export const initialPaymentState: RazorpayPaymentState = {
  orderId: null,
  key: null,
  amount: null,
  razorpayId: null,
  paymentInitiatedWithOrderId: false,
  error: {
    errorPresent: false,
    errorMessage: null,
  },
};

const _gintaaPaymentReducer = createReducer(
  initialPaymentState,

  on(PaymentActions.paymentInitiated, (state, action) => ({
    ...state,
    amount: action.input.amount,
  })),

  on(PaymentActions.paymentInitiatedWithOrderId, (state, action) => ({
    ...state,
    orderId: action.input.orderId,
    key: action.input.key,
    paymentInitiatedWithOrderId: true,
  })),

  on(PaymentActions.razorPayIdgeneratedAfterSuccess, (state, action) => ({
    ...state,
    razorpayId: action.input.razorPayId,
  })),

  on(PaymentActions.paymentFailure, (state, action) => ({
    ...state,
    error: { errorPresent: true, errorMessage: action.error.errorMessage },

    //paymentInitiatedWithOrderId: false,
  })),

  on(PaymentActions.paymentSuccess, (state) => ({
    ...state,
    orderId: null,
    key: null,
    amount: null,
    razorpayId: null,
    paymentInitiatedWithOrderId: false,

    //paymentInitiatedWithOrderId: false,
  })),
  on(PaymentActions.clearPaymentError, (state) => ({
    ...state,
    error: { errorPresent: false, errorMessage: null },
  }))
);

export function gintaaPaymentReducer(
  state: RazorpayPaymentState,
  action: Action
) {
  return _gintaaPaymentReducer(state, action);
}
