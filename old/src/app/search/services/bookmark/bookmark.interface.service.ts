import { Observable } from 'rxjs/Observable';

import { Bookmark } from '../../models/bookmark';

/**
 * Interface for bookmark service.
 *
 * @export
 * @interface IBookmarkService
 */
export interface IBookmarkService {

    /**
     * Returns all bookmarked documents.
     *
     * @returns {Observable<Bookmark[]>} bookmarked documents as list.
     * @memberof IBookmarkService
     */
    get(): Observable<Bookmark[]>;

    /**
     * Saves the given bookmark.
     *
     * @param {Bookmark} bookmark The bookmark.
     * @returns {Observable<Bookmark | null>} bookmark observable or null.
     * @memberof IBookmarkService
     */
    save(bookmark: Bookmark): Observable<Bookmark | null>;

    /**
     * Removes given bookmark.
     *
     * @param {string | undefined} id The bookmark id.
     * @returns {Observable<boolean>} true, if bookmark is removed.
     * @memberof IBookmarkService
     */
    delete(id: string | undefined): Observable<boolean>;
}
