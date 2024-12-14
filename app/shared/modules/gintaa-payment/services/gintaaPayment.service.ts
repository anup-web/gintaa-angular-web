import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs-compat/Observable";

@Injectable({
  providedIn: "root",
})
export class GintaaPaymentService {
  constructor(private http: HttpClient) {}

  getOfferId(inputData) {
    return new Observable((observer) => {
      observer.next({
        success: true,
        status: "order created successfully",
        value: { id: "abc", amount: "400" },
        key: "rzp_test_Tk2YiOeZMbvOYs",
      });
    });
  }

  saveRazorpayTransactionId(inputData) {
    return new Observable((observer) => {
      observer.next({
        success: true,
      });
    });
  }
}
