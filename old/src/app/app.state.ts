import { Action } from 'redux';
import { ImmutableObject } from 'seamless-immutable';

import { Bookmark } from './search/models/bookmark';
import { LastQuery } from './search/models/last-query';
import { Collection } from './search/models/querymodel/collection';
import { RequestFacet } from './search/models/querymodel/request-facet';
import { SearchRequest } from './search/models/search-request';
import { SearchResult } from './search/models/search-result';
import { SearchSave } from './search/models/search-save';

export type ImmutableState<T> = ImmutableObject<T> & T;

export interface PayloadAction extends Action {
    payload?: any;
}

export interface AppState {
    userState: UserState;
    searchState: SearchState;
    bookmarkState: BookmarkState;
    searchSaveState: SearchSaveState;
    searchSaveDialogState: SearchSaveDialogState;
    collectionState: CollectionState;
    lastQueryState: LastQueryState;
    feedbackState: FeedbackState;
    facetState: FacetState;
    prominentFilterState: ProminentFilterState;
    suggestionsState: SuggestionsState;
}

export interface UserState {
    type: string;
    isAuthenticated: boolean;
    userName: string;
}

export interface SearchState {
    type: string;
    isLoading: boolean;
    searchResult: SearchResult;
    searchRequest: SearchRequest;
}

export interface BookmarkState {
    type: string;
    bookmarkList: Array<Bookmark>;
}

export interface SearchSaveState {
    type: string;
    searchSaveList: Array<SearchSave>;
}

export interface SearchSaveDialogState {
    type: string;
}

export interface CollectionState {
    type: string;
    collections: Array<Collection>;
}

export interface LastQueryState {
    type: string;
    isLoading: boolean;
    lastQueryList: Array<LastQuery>;
}

export interface FeedbackState {
    type: string;
}

export interface FacetState {
    type: string;
    facetList: Array<RequestFacet>;
}

export interface ProminentFilterState {
    type: string;
    visible: boolean;
}

export interface SuggestionsState {
    type: string;
    isUserLoading: boolean;
    isGlobalLoading: boolean;
    userSuggestions: Array<string>;
    globalSuggestions: Array<string>;
}
