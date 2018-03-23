import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorHandlerService } from '../../../core/error/error-handler.service';
import { Helper } from '../../../shared/helpers/helper';
import { BaseService } from '../../../shared/services/base.service';
import { Bookmark } from '../../models/bookmark';
import { IBookmarkService } from './bookmark.interface.service';

/**
 * Bookmark service.
 *
 * @export
 * @class BookmarkService
 * @extends {BaseService}
 * @implements {IBookmarkService}
 */
@Injectable()
export class BookmarkService extends BaseService implements IBookmarkService {

    private saveUrl = 'ext/pref/savedocument';
    private getUrl = 'ext/pref/saveddocuments';
    private deleteUrl = 'ext/pref/saveddocument';

    /**
     * Constructor.
     */
    constructor(
        private http: HttpClient,
        private helper: Helper,
        private errorHandlerService: ErrorHandlerService
    ) {
        super();
    }

    /**
     * Saves the given bookmark.
     *
     * @param {Bookmark} bookmark The bookmark.
     * @returns {Observable<Bookmark | null>} bookmark observable or null.
     * @memberof IBookmarkService
     */
    save(bookmark: Bookmark): Observable<Bookmark | null> {
        return this.http.post(this.buildUrl(this.saveUrl), bookmark, { headers: this.getDefaultHeader() })
            .map(resp => <Bookmark>resp)
            .catch(this.errorHandlerService.handleError('BookmarkService::save()', null));
    }

    /**
     * Returns all bookmarked documents.
     *
     * @returns {Observable<Array<Bookmark>>} bookmarked documents.
     * @memberof BookmarkService
     */
    get(): Observable<Array<Bookmark>> {
        return this.http.get(this.buildUrl(this.getUrl), { headers: this.getDefaultHeader() })
            .map(resp => <Array<Bookmark>>resp)
            .catch(this.errorHandlerService.handleError('BookmarkService::get()', new Array<Bookmark>()));
    }

    /**
     * Deletes given bookmark from bookmark list.
     *
     * @param {string | undefined} id The bookmark id.
     * @returns {Observable<boolean>} true, if bookmark was deleted.
     * @memberof BookmarkService
     */
    delete(id: string | undefined): Observable<boolean> {
        if (this.helper.isNullOrUndefined(id)) {
            return Observable.of<boolean>(false);
        }
        return this.http.delete(`${this.buildUrl(this.deleteUrl)}/${id}`, { headers: this.getDefaultHeader() })
            .map(resp => true)
            .catch(this.errorHandlerService.handleError('BookmarkService::delete()', false));
    }
}
