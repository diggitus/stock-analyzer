import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgArrayPipesModule, NgStringPipesModule } from 'angular-pipes';

import { CoreModule } from '../core/core.module';
import { OrderItems } from '../shared/pipes/order-items.pipe';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from './../pipe.module';
import { BookmarkActions } from './actions/bookmark/bookmark.actions';
import { CollectionActions } from './actions/collection/collection.actions';
import { FacetActions } from './actions/facet/facet.actions';
import { LastQueryActions } from './actions/lastqueries/lastqueries.actions';
import { ProminentFilterActions } from './actions/prominent-filter/prominent-filter.actions';
import { SearchSaveActions } from './actions/search-save/search-save.actions';
import { SearchActions } from './actions/search/search.actions';
import { SuggestionsActions } from './actions/suggestions/suggestions.actions';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { ProminentFilterComponent } from './prominent-filter/prominent-filter.component';
import { SearchCollectionsComponent } from './search-collections/search-collections.component';
import { SearchFilterDialogItemsComponent } from './search-filter-dialog-items/search-filter-dialog-items.component';
import { SearchFilterDialogComponent } from './search-filter-dialog/search-filter-dialog.component';
import { SearchFilterFacetComponent } from './search-filter-facet/search-filter-facet.component';
import { SearchFilterItemsComponent } from './search-filter-items/search-filter-items.component';
import { SearchFilterSidebarComponent } from './search-filter-sidebar/search-filter-sidebar.component';
import { SearchFilterSubMenuComponent } from './search-filter-sub-menu/search-filter-sub-menu.component';
import { SearchFilterTagsComponent } from './search-filter-tags/search-filter-tags.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchGridComponent } from './search-grid/search-grid.component';
import { SearchIndexComponent } from './search-index/search-index.component';
import { SearchPaginationComponent } from './search-pagination/search-pagination.component';
import { SearchQueryComponent } from './search-query/search-query.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchSaveListComponent } from './search-save-list/search-save-list.component';
import { SearchSaveDialogComponent } from './search-save/dialog/search-save-dialog.component';
import { SearchSaveDialogActions } from './search-save/dialog/state/search-save-dialog.actions';
import { SearchSaveComponent } from './search-save/search-save.component';
import { SearchSortComponent } from './search-sort/search-sort.component';
import { BookmarkService } from './services/bookmark/bookmark.service';
import { CollectionService } from './services/collection/collection.service';
import { FacetService } from './services/facet/facet.service';
import { FilterHelper } from './services/filter/filter.helper';
import { FilterService } from './services/filter/filter.service';
import { LastqueriesService } from './services/lastqueries/lastqueries.service';
import { SearchSaveService } from './services/search-save/search-save.service';
import { SearchService } from './services/search/search.service';
import { SuggestionsService } from './services/suggestions/suggestions.service';

@NgModule({
    declarations: [
        SearchQueryComponent,
        SearchIndexComponent,
        SearchResultComponent,
        SearchGridComponent,
        SearchCollectionsComponent,
        SearchFilterComponent,
        SearchFilterTagsComponent,
        SearchFilterFacetComponent,
        SearchFilterItemsComponent,
        SearchFilterDialogComponent,
        SearchFilterDialogItemsComponent,
        SearchFilterSidebarComponent,
        SearchFilterSubMenuComponent,
        SearchSaveComponent,
        SearchPaginationComponent,
        SearchSaveDialogComponent,
        OrderItems,
        SearchSaveListComponent,
        BookmarkListComponent,
        SearchSortComponent,
        ProminentFilterComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SearchRoutingModule,
        PipeModule,
        NgStringPipesModule,
        NgArrayPipesModule
    ],
    exports: [
        SearchIndexComponent,
        BookmarkListComponent,
        SearchSaveListComponent
    ],
    providers: [
        BookmarkActions,
        SearchActions,
        SearchSaveActions,
        SearchSaveDialogActions,
        CollectionActions,
        LastQueryActions,
        BookmarkService,
        SearchService,
        FilterService,
        SearchSaveService,
        CollectionService,
        LastqueriesService,
        SearchSaveService,
        FacetActions,
        FacetService,
        FilterHelper,
        ProminentFilterActions,
        SuggestionsService,
        SuggestionsActions
    ]
})
export class SearchModule { }
