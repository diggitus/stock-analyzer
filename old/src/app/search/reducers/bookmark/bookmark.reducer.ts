import * as Immutable from 'seamless-immutable';

import { BookmarkActions } from '../../actions/bookmark/bookmark.actions';
import { Bookmark } from '../../models/bookmark';
import { BookmarkState, ImmutableState, PayloadAction } from './../../../app.state';

/**
 * The initial state of the bookmark state.
 */
const INITIAL_STATE = Immutable<BookmarkState>({
    type: '',
    bookmarkList: new Array<Bookmark>()
});

/**
 * The bookmark reducer to change the state of the bookmark list in store.
 *
 * @export
 * @param {BookmarkState} [state=INITIAL_STATE] The initial bookmark state.
 * @param {PayloadAction} action Contains payload and state type.
 * @returns {BookmarkState} new bookmark state.
 */
export function BookmarkReducer(state: ImmutableState<BookmarkState> = INITIAL_STATE, action: PayloadAction): ImmutableState<BookmarkState> {
    switch (action.type) {

        case BookmarkActions.BOOKMARK_FAILED:
        case BookmarkActions.BOOKMARKS_LOADING:
        case BookmarkActions.BOOKMARK_DELETING:
        case BookmarkActions.BOOKMARK_SAVING: {
            return state.merge({
                type: action.type
            });
        }
        case BookmarkActions.BOOKMARKS_LOADED: {
            return state.merge({
                type: action.type,
                bookmarkList: action.payload
            });
        }
        case BookmarkActions.BOOKMARK_SAVED: {
            return state.merge({
                type: action.type,
                bookmarkList: [
                    action.payload,
                    ...state.bookmarkList
                ]
            });
        }
        case BookmarkActions.BOOKMARK_DELETED: {
            const deleteIndex = state.bookmarkList.findIndex(bookmark => bookmark.id === action.payload.id);

            if (deleteIndex > -1) {
                return state.merge({
                    type: action.type,
                    bookmarkList: [
                        ...state.bookmarkList.slice(0, deleteIndex),
                        ...state.bookmarkList.slice(deleteIndex + 1)
                    ]
                });
            }
            return state.merge({
                type: BookmarkActions.BOOKMARK_FAILED
            });
        }
        default: {
            return state;
        }

    }
}
