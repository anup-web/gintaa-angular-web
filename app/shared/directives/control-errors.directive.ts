import { Directive, Optional, Inject, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Input, Host, OnInit, OnDestroy } from '@angular/core';
import { NgControl, ControlContainer } from '@angular/forms';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { merge, EMPTY, Observable, Subject } from 'rxjs';
import { FormSubmitDirective } from './form-submit.directive';
import { FORM_ERRORS } from '../configs/validation-errors';
import { ValidateMessageComponent } from '../components/validate-message/validate-message.component';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[formControl], [formControlName], [controlError]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  ref: ComponentRef<ValidateMessageComponent>;
  container: ViewContainerRef;
  submit$: Observable<Event>;
  @Input() customErrors = {};
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(FORM_ERRORS) private errors,
    @Optional() @Host() private form: FormSubmitDirective,
    private controlDir: NgControl) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    merge(
      this.submit$,
      this.control.valueChanges
    ).pipe(
      takeUntil(this.componentDestroyed$)).subscribe((v) => {
        const controlErrors = this.control.errors;
        if (controlErrors) {
          let firstKey = Object.keys(controlErrors)[0];
          switch (firstKey) {
            case 'minlength':
              firstKey = "minLength";
              break;
            case 'maxlength':
              firstKey = "maxLength";
              break;
            default:

          }
          const getError = this.errors[firstKey];
          // console.log("getError:", firstKey, this.errors, this.customErrors );
          // const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]);
          const text = this.customErrors[firstKey] || "Validation Error";
          
          this.setError(text);
        } else if (this.ref) {
          this.setError(null);
        }
      })
  }

  get control() {
    return this.controlDir.control;
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ValidateMessageComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }

  ngOnDestroy() { 
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}