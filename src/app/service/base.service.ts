import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";

@Injectable()
export class BaseService {

    getUrl = "http://financials.morningstar.com/valuate/current-valuation-list.action?&t=XETR:ads&region=usa&culture=en-US";

    constructor(
        private http: Http
    ) {}

    get(): Observable<any> {
        return this.http.get(this.getUrl);
    }

}