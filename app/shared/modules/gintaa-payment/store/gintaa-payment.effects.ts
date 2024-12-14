import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { PaymentActions } from "./actions-type";
import { GintaaPaymentService } from "../services/gintaaPayment.service";

@Injectable()
export class GintaaPayEffects {
  constructor(
    private actions$: Actions,
    private razorpayService: GintaaPaymentService
  ) {}

  fetchRazorpayOrderId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.paymentInitiated),
      switchMap((action) => {
        return this.razorpayService.getOfferId(action.input).pipe(
          map((response: any) => {
            // console.log(response);
            return PaymentActions.paymentInitiatedWithOrderId({
              input: { orderId: response.order_id, key: response.key },
            });
          }),
          catchError((error) => {
            // console.log("response error:: ", error);
            return of(PaymentActions.paymentFailure({ error: error.error }));
          })
        );
      })
    )
  );

  fetchRazorPaySuccessId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.razorPayIdgeneratedAfterSuccess),
      switchMap((action) => {
        // console.log(
        //   "Within PaymentActions.razorPayIdgeneratedAfterSuccess effect"
        // );
        return this.razorpayService
          .saveRazorpayTransactionId(action.input)
          .pipe(
            map((response: any) => {
              // console.log("successful", response);
              return PaymentActions.paymentSuccess();
            }),
            catchError((error) => {
              // console.log("response error:: ", error);
              return of(PaymentActions.paymentFailure({ error: error.error }));
            })
          );
      })
    )
  );
}
