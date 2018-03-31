import { Component } from '@angular/core';
import { HeaderActions } from 'app/core/header/header.actions';
import { SearchRequest } from 'app/model/searchRequest';

/**
 * This class represents the header component.
 */
@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {

    query: string;

    /**
     * Constructor.
     */
    constructor(
        private headerActions: HeaderActions
    ) { }

    /**
     * Handles click on search button.
     * @param event The click event.
     */
    onSearch(event: Event) {
        this.search();
        event.preventDefault();
    }

    /**
     * Handles enter key pressed.
     */
    onEnter() {
        this.search();
    }

    /**
     * Triggers a new search.
     */
    search() {
        const searchRequest = new SearchRequest(this.query);
        this.headerActions.executeSearch(searchRequest);
    }
}
