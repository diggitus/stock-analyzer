import { Helper } from '../../../shared/helpers/helper';
import { Bookmark } from '../../models/bookmark';
import { BookmarkActions } from './bookmark.actions';

describe('BookmarkActions', () => {
    const ngReduxStub: any = {};
    const bookmarkServiceStub: any = {};
    const helper = new Helper();

    const bookmarkList = new Array<Bookmark>();
    let bookmarkActions: BookmarkActions;

    beforeEach(() => {
        bookmarkActions = new BookmarkActions(ngReduxStub, bookmarkServiceStub, helper);

        let bookmark = new Bookmark();
        bookmark.id = '1';
        bookmark.idUntouched = '1';
        bookmarkList.push(bookmark);

        bookmark = new Bookmark();
        bookmark.id = '2';
        bookmark.idUntouched = '2';
        bookmarkList.push(bookmark);
    });

    it('should find bookmark in bookmark list', () => {
        const findBookmark = bookmarkActions.findById('1', bookmarkList);
        expect(findBookmark).not.toBeNull();

        if (findBookmark) {
            expect(findBookmark.id).toBe('1');
        }
    });

    it('should not find bookmark in bookmark list', () => {
        const findBookmark = bookmarkActions.findById('3', bookmarkList);
        expect(findBookmark).toBeNull();
    });

    it('should not find bookmark in empty bookmark list', () => {
        const emptyBookmarkList: Array<Bookmark> = new Array<Bookmark>();
        const findBookmark = bookmarkActions.findById('1', emptyBookmarkList);
        expect(findBookmark).toBeNull();
    });

});
