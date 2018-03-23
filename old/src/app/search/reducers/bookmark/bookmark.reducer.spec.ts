import * as Immutable from 'seamless-immutable';

import { BookmarkState } from '../../../app.state';
import { BookmarkActions } from '../../actions/bookmark/bookmark.actions';
import { Bookmark } from '../../models/bookmark';
import { BookmarkReducer } from './bookmark.reducer';

describe('BookmarkReducer', () => {

    let bookmarkList: Array<Bookmark>;
    let initialState: any;


    beforeEach(() => {
        bookmarkList = new Array<Bookmark>();

        let bookmark = new Bookmark();
        bookmark.id = '1';
        bookmarkList.push(bookmark);

        bookmark = new Bookmark();
        bookmark.id = '2';
        bookmarkList.push(bookmark);

        bookmark = new Bookmark();
        bookmark.id = '3';
        bookmarkList.push(bookmark);

        initialState = Immutable<BookmarkState>({
            type: '',
            bookmarkList: new Array<Bookmark>()
        });
    });

    it('should saving bookmark', () => {
        const action: any = {
            type: BookmarkActions.BOOKMARK_SAVING
        };
        const newState = BookmarkReducer(initialState, action);

        expect(newState).not.toBeNull();
        expect(newState.bookmarkList.length).toBe(0);
    });

    it('should loaded all bookmarks', () => {
        const action: any = {
            type: BookmarkActions.BOOKMARKS_LOADED,
            payload: bookmarkList
        };
        const newState = BookmarkReducer(initialState, action);

        expect(newState).not.toBeNull();
        expect(newState.bookmarkList.length).toBe(3);
    });

    it('should saved bookmark in empty list', () => {
        const bookmark = new Bookmark();
        bookmark.id = '1';

        const action: any = {
            type: BookmarkActions.BOOKMARK_SAVED,
            payload: bookmark
        };

        const newState = BookmarkReducer(initialState, action);

        expect(newState).not.toBeNull();
        expect(newState.bookmarkList.length).toBe(1);
        expect(newState.bookmarkList[0].id).toBe('1');
    });

    it('should saved bookmark in list', () => {
        const bookmark1 = new Bookmark();
        const bookmark2 = new Bookmark();
        bookmark1.id = '1';
        bookmark2.id = '2';

        // save bookmark 1
        const action1: any = {
            type: BookmarkActions.BOOKMARK_SAVED,
            payload: bookmark1
        };
        const state = BookmarkReducer(initialState, action1);

        // save bookmark 2
        const action2: any = {
            type: BookmarkActions.BOOKMARK_SAVED,
            payload: bookmark2
        };
        const newState = BookmarkReducer(state, action2);

        expect(newState).not.toBeNull();
        expect(newState.bookmarkList.length).toBe(2);
        expect(newState.bookmarkList[0].id).toBe('2');
        expect(newState.bookmarkList[1].id).toBe('1');
    });

    it('should deleted bookmark', () => {
        const bookmark = new Bookmark();
        bookmark.id = '2';

        initialState = Immutable<BookmarkState>({
            type: '',
            bookmarkList: bookmarkList
        });

        const action: any = {
            type: BookmarkActions.BOOKMARK_DELETED,
            payload: bookmark
        };
        const newState = BookmarkReducer(initialState, action);

        expect(newState).not.toBeNull();
        expect(newState.bookmarkList.length).toBe(2);
        expect(newState.bookmarkList[0].id).toBe('1');
        expect(newState.bookmarkList[1].id).toBe('3');
    });

    it('should delete nothing', () => {
        const bookmark = new Bookmark();
        bookmark.id = '4'; // doesn't exist in list

        initialState = Immutable<BookmarkState>({
            type: '',
            bookmarkList: bookmarkList
        });

        const action: any = {
            type: BookmarkActions.BOOKMARK_DELETED,
            payload: bookmark
        };
        const newState = BookmarkReducer(initialState, action);

        expect(newState).not.toBeNull();
        expect(newState.bookmarkList.length).toBe(3);
        expect(newState.bookmarkList[0].id).toBe('1');
        expect(newState.bookmarkList[1].id).toBe('2');
        expect(newState.bookmarkList[2].id).toBe('3');
        expect(newState.type).toBe(BookmarkActions.BOOKMARK_FAILED);
    });

});
