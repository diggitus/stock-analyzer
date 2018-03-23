import { combineReducers } from 'redux';

import { UserActions } from './login/actions/user.actions';
import { UserReducer } from './login/actions/user.reducer';
import { BookmarkReducer } from './search/reducers/bookmark/bookmark.reducer';
import { CollectionReducer } from './search/reducers/collection/collection.reducer';
import { FacetReducer } from './search/reducers/facet/facet.reducer';
import { LastQueryReducer } from './search/reducers/lastqueries/last-query.reducer';
import { ProminentFilterReducer } from './search/reducers/prominent-filter/prominent-filter.reducer';
import { SearchSaveReducer } from './search/reducers/search-save/search-save.reducer';
import { SearchReducer } from './search/reducers/search/search.reducer';
import { SuggestionsReducer } from './search/reducers/suggestions/suggestions.reducer';
import { SearchSaveDialogReducer } from './search/search-save/dialog/state/search-save-dialog.reducer';
import { FeedbackReducer } from './shared/footer/feedback/feedback.reducer';

const appReducer = combineReducers(<any>{
    userState: UserReducer,
    searchState: SearchReducer,
    bookmarkState: BookmarkReducer,
    searchSaveState: SearchSaveReducer,
    searchSaveDialogState: SearchSaveDialogReducer,
    collectionState: CollectionReducer,
    lastQueryState: LastQueryReducer,
    feedbackState: FeedbackReducer,
    facetState: FacetReducer,
    prominentFilterState: ProminentFilterReducer,
    suggestionsState: SuggestionsReducer
});

export const rootReducer = (state: any, action: any) => {
    if (action.type === UserActions.LOGGING_OUT || action.type === UserActions.FORCE_LOG_OUT) {
        state = undefined;
    }

    return appReducer(state, action);
};
