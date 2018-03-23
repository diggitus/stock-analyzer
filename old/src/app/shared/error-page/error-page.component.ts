import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Helper } from '../helpers/helper';

/**
 * This class represents the error page component.
 *
 * @export
 * @class ErrorPageComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'emil-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
    public error: string;
    public returnedUrl: string;

    /**
     * Constructor.
     * @memberof ErrorPageComponent
     */
    constructor(
        private route: ActivatedRoute,
        public helper: Helper,
        private router: Router
    ) {
        this.error = '';
        this.returnedUrl = '';
    }

    /**
     * OnInit method.
     *
     * @memberof ErrorPageComponent
     */
    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params != null) {
                this.getUrlParameters(params);
            } else {
                this.router.navigate(['/error', '404', 'search']);
            }
        });
    }

    /**
     * Returns url params.
     *
     * @param {*} params query params.
     * @memberof ErrorPageComponent
     */
    getUrlParameters(params: any) {
        if (params != null) {
            if (!this.helper.isNullOrEmpty(params.error)) {
                this.error = params.error.toLowerCase();
                if (this.error !== '404' && this.error !== '500') {
                    this.error = '404';
                }
            }
            if (!this.helper.isNullOrEmpty(params.return_url)) {
                this.returnedUrl = params.return_url.toLowerCase();
            }
        }
    }
}
