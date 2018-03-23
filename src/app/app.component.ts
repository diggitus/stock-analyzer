import { Component } from '@angular/core';
import { FinancialsService } from 'app/services/financials.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app works!';

    output = '';

    constructor(private financialsService: FinancialsService) {
        this.financialsService.get().subscribe(resp => this.output = resp);
    }
}
