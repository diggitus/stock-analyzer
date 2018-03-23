// Angular Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

import { ClickOutsideDirective } from './clickoutside.directive';
import { ErrorHandlerService } from './error/error-handler.service';
import { ConsoleLoggerService } from './logger/console-logger.service';
import { LoggerService } from './logger/logger.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

// EMIL Components
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SpinnerComponent,
        ClickOutsideDirective
    ],
    exports: [
        SpinnerComponent,
        ClickOutsideDirective
    ],
    providers: [
        SpinnerService,
        { provide: LoggerService, useClass: ConsoleLoggerService },
        ErrorHandlerService,
        MessageService
    ]
})
export class CoreModule { }
