import { HttpHeaders } from '@angular/common/http';

export class BaseService {

    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'text/html;charset=UTF-8',
        'Accept': 'text/html'
    });

    getDefaultHeaders(): HttpHeaders {
        return this.headers;
    }

}
