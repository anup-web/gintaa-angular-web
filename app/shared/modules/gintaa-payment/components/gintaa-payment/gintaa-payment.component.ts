import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { GintaaPaymentService } from "../../services/gintaaPayment.service";
import * as gintaaApp from "@gintaa/store/app.reducer";
import { selectPaymentState } from "../../store/gintaa-payment.selectors";
import { PaymentActions } from "../../store/actions-type";

declare var Razorpay: any;
@Component({
  selector: "gintaa-payment",
  templateUrl: "./gintaa-payment.component.html",
  //styleUrls: ["./gintaa-payment.component.scss"],
})
export class GintaaPaymentComponent implements OnInit {
  @Input("amount") data: any;
  @Input("currentUser") user: any;
  @Output() onClickPayDone: EventEmitter<any> = new EventEmitter<any>();

  razorpayOptions = {
    key: "",
    amount: 0,
    currency: "INR",
    prefill: { contact: "" },
    name: "",
    description: "",
    order_id: "",
    handler: (res) => console.log(res),
  };

  constructor(private store: Store<gintaaApp.AppState>) {}

  ngOnInit(): void {}

  onClickPay() {
    this.store.dispatch(PaymentActions.clearPaymentError());
    // console.log("here", this.user.contactInformation);
    this.store.dispatch(
      PaymentActions.paymentInitiated({
        input: {
          amount: this.data,
          contactNumber: this.user.contactInformation,
        },
      })
    );
    this.store.select(selectPaymentState).subscribe((paymentState) => {
      // console.log(paymentState);
      if (
        paymentState.paymentInitiatedWithOrderId &&
        !paymentState.error.errorPresent
      ) {
        this.razorpayOptions.key = paymentState.key;
        this.razorpayOptions.amount = paymentState.amount;
        this.razorpayOptions.handler = this.razorPayHandler;
        this.razorpayOptions["prefill"].contact = this.user.contactInformation;
        var rzp1 = new Razorpay(this.razorpayOptions);
        rzp1.open();
      } else if (paymentState.error.errorPresent) {
        alert(paymentState.error.errorMessage);
      }
    });
  }

  razorPayHandler = (response) => {
    // console.log("RazorpayhandlerResponse", response);
    if (response) {
      this.store.dispatch(
        PaymentActions.razorPayIdgeneratedAfterSuccess({
          input: { razorPayId: response.razorpay_payment_id },
        })
      );
      this.onClickPayDone.emit({ success: true });
    }
  };
}
