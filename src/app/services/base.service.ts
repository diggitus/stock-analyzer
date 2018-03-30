import { HttpHeaders } from '@angular/common/http';

/**
 * Base service.
 */
export class BaseService {

    baseUrl = 'http://financials.morningstar.com';

    private htmlHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'text/html;charset=UTF-8',
        'Accept': 'text/html'
    });

    private jsonHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json'
    });

    /**
     * Returns default request header.
     */
    getHtmlHeaders(): HttpHeaders {
        return this.htmlHeaders;
    }

    getJsonHeaders(): HttpHeaders {
        return this.jsonHeaders;
    }

}
