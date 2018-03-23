import { NgRedux, select } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.state';
import { Helper } from '../../../shared/helpers/helper';
import { Bookmark } from '../../models/bookmark';
import { Result } from '../../models/searchresult/result';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { SearchActions } from '../search/search.actions';

/**
 * Service for bookmark actions.
 *
 * @export
 * @class BookmarkActions
 */
@Injectable()
export class BookmarkActions {

    static BOOKMARKS_LOADING = 'BOOKMARKS_LOADING';
    static BOOKMARKS_LOADED = 'BOOKMARKS_LOADED';
    static BOOKMARK_SAVING = 'BOOKMARK_SAVING';
    static BOOKMARK_SAVED = 'BOOKMARK_SAVED';
    static BOOKMARK_DELETING = 'BOOKMARK_DELETING';
    static BOOKMARK_DELETED = 'BOOKMARK_DELETED';
    static BOOKMARK_FAILED = 'BOOKMARK_FAILED';

    @select(['bookmarkState', 'bookmarkList']) bookmarkList$: Observable<Array<Bookmark>>;
    private bookmarkList: Array<Bookmark>;

    /**
     * Constructor.
     */
    constructor(
        private ngRedux: NgRedux<AppState>,
        private bookmarkService: BookmarkService,
        private helper: Helper
    ) {
        this.bookmarkList = new Array<Bookmark>();
        this.bookmarkList$.subscribe(savedList => {
            this.bookmarkList = savedList;
        });
    }

    /**
     * Returns a list with all bookmarked documents.
     *
     * @returns {Observable<Array<Bookmark>>} All bookmarks or an empty list.
     * @memberof BookmarkActions
     */
    get(): Observable<Array<Bookmark>> {
        this.ngRedux.dispatch({ type: BookmarkActions.BOOKMARKS_LOADING });

        return this.bookmarkService.get().map(bookmarkList => {
            this.ngRedux.dispatch({
                type: BookmarkActions.BOOKMARKS_LOADED,
                payload: bookmarkList
            });

            if (this.helper.isEmptyArray(bookmarkList)) {
                return new Array<Bookmark>();
            } else {
                return bookmarkList.sort(this.sortBookmarks);
            }
        });
    }

    /**
     * Saves the given bookmark.
     *
     * @param {Bookmark} bookmark The bookmark to save.
     * @return {Observable<Bookmark | null>} The bookmark from server or null.
     * @memberof BookmarkActions
     */
    save(bookmark: Bookmark): Observable<Bookmark | null> {
        this.ngRedux.dispatch({ type: BookmarkActions.BOOKMARK_SAVING });

        return this.bookmarkService.save(bookmark).map(bookmarkResp => {
            if (bookmarkResp) {
                this.ngRedux.dispatch({
                    type: BookmarkActions.BOOKMARK_SAVED,
                    payload: bookmarkResp
                });
                return bookmarkResp;
            } else {
                this.ngRedux.dispatch({ type: BookmarkActions.BOOKMARK_FAILED });
                return null;
            }
        });
    }

    /**
     * Deletes given bookmark.
     *
     * @param {Bookmark} bookmark The bookmark id to delete.
     * @returns {Observable<boolean>} true, if bookmark was deleted, otherwise false.
     * @memberof BookmarkActions
     */
    delete(bookmark: Bookmark): Observable<boolean> {
        if (bookmark === null) {
            return Observable.of<boolean>(false);
        }
        this.ngRedux.dispatch({ type: BookmarkActions.BOOKMARK_DELETING });

        return this.bookmarkService.delete(bookmark.id).map(resp => {
            if (resp) {
                this.ngRedux.dispatch({
                    type: BookmarkActions.BOOKMARK_DELETED,
                    payload: bookmark
                });
                return true;
            } else {
                this.ngRedux.dispatch({ type: BookmarkActions.BOOKMARK_FAILED });
                return false;
            }
        });
    }

    /**
     * Finds bookmark by id. Search in given bookmark list.
     *
     * @param {string} id The bookmark id.
     * @param {Array<Bookmark>} bookmarkList A list with bookmarks.
     * @returns {(Bookmark | null)} bookmark or null.
     * @memberof BookmarkActions
     */
    findById(bookmarkId: string, bookmarkList: Array<Bookmark>): Bookmark | null {
        if (this.helper.isEmptyArray(bookmarkList)) {
            return null;
        }
        const bookmark = bookmarkList.find((bookmark: Bookmark) => bookmark.id === bookmarkId);
        if (bookmark) {
            return bookmark;
        } else {
            return null;
        }
    }

    /**
     * Sort function for bookmark list.
     *
     * @param {Bookmark} current The current bookmark.
     * @param {Bookmark} next The next bookmark.
     * @returns sorted bookmarks.
     * @memberof BookmarkActions
     */
    sortBookmarks(current: Bookmark, next: Bookmark) {
        if (current.date && next.date) {
            if (current.date > next.date) {
                return -1;
            } else {
                return 1;
            }
        }
        return 0;
    }

    /**
     * Getter for attribute bookmarkList.
     *
     * @returns bookmarkList.
     * @memberof BookmarkActions
     */
    getBookmarkList() {
        return this.bookmarkList;
    }

    /**
     * Bookmarks given result.
     *
     * @param {Result} result The result.
     * @param {Bookmark} bookmark Contains bookmark information like hashed id.
     * @param {boolean} bookmarked True or false.
     * @memberof BookmarkActions
     */
    setResultBookmark(result: Result, bookmark: Bookmark, bookmarked: boolean) {
        this.ngRedux.dispatch({
            type: SearchActions.RESULT_BOOKMARKED,
            payload: {
                result: result,
                bookmark: bookmark,
                bookmarked: bookmarked
            }
        });
    }

    /**
     * Deletes bookmark from result list.
     *
     * @param {Bookmark} bookmark The bookmark with bookmark id.
     * @param {false} bookmarked true or false.
     * @memberof BookmarkActions
     */
    deleteResultBookmark(bookmark: Bookmark, bookmarked: false) {
        this.ngRedux.dispatch({
            type: SearchActions.RESULT_BOOKMARK_DELETED,
            payload: {
                bookmark: bookmark,
                bookmarked: bookmarked
            }
        });
    }

}
