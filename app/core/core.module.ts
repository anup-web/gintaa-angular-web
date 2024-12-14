import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@gintaa/core/material.module';
import { SharedModule } from '@gintaa/shared/modules/shared.module';
import { CanDeactivateGuard } from './guards/can.deactivate.guard';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { FooterModule } from './layout/footer/footer.module';
import { HeaderModule } from './layout/header/header.module';
import { SearchModule } from './layout/header/search/search.module';
import { ACTIVE_THEME, ThemeOptions, THEMES } from './theme/symbols';
import { ThemeDirective } from './theme/theme.directive';
import { ThemeService } from './theme/theme.service';

@NgModule({
  declarations: [
    ThemeDirective
  ],
  imports: [
    MaterialModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    SearchModule,
    SharedModule
  ],
  exports: [
    MaterialModule,
    HeaderModule,
    FooterModule,
    SearchModule,
    ThemeDirective
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    CanDeactivateGuard,
    ThemeService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule { 
  static forRoot(options: ThemeOptions): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: THEMES,
          useValue: options.themes
        },
        {
          provide: ACTIVE_THEME,
          useValue: options.active
        }
      ]
    };
  }
}
