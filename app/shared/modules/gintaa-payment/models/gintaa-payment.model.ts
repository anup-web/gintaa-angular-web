export interface PaymentInformation {
  amount: number;
  contactNumber: string;
}

export interface RazorpayPaymentState {
  orderId: string;
  key: string;
  amount: number;
  razorpayId: string;
  paymentInitiatedWithOrderId: boolean;
  error: RazorpayErrorDetails;
}

export interface RazorPayOrderProcessingDetails {
  orderId: string;
  key: string;
}

export interface RazorPayOrderSuccessDetails {
  razorPayId: string;
}

export interface RazorpayErrorDetails {
  errorPresent: boolean;
  errorMessage: any;
}
