import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { CoreModule } from '../../../core/core.module';
import * as loggerService from '../../../core/logger/console-logger.service';
import { UserActions } from '../../../login/actions/user.actions';
import { Helper } from '../../../shared/helpers/helper';
import { Bookmark } from '../../models/bookmark';
import { BookmarkService } from './bookmark.service';

const translations: any = { 'TEST': 'This is a test' };
class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return Observable.of(translations);
    }
}

// tslint:disable:no-non-null-assertion
describe('BookmarkService', () => {

    let saveService: BookmarkService;
    let http: HttpTestingController;
    let bookmark1: Bookmark;
    let bookmark2: Bookmark;
    let bookmarks: Array<Bookmark>;

    beforeEach(() => {
        const userActionsStub = () => { };

        TestBed.configureTestingModule({
            imports: [
                CoreModule,
                RouterTestingModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader }
                }),
                HttpClientTestingModule
            ],
            providers: [
                Helper,
                BookmarkService,
                { provide: UserActions, useValue: userActionsStub }
            ]
        });
    });

    beforeEach(() => {
        saveService = TestBed.get(BookmarkService);
        http = TestBed.get(HttpTestingController);

        loggerService.setDebugMode(false);

        bookmark1 = new Bookmark();
        bookmark1.id = '1';
        bookmark1.title = 'Title';
        bookmark1.idUntouched = 'file:///1';

        bookmark2 = new Bookmark();
        bookmark2.id = '1';
        bookmark2.title = 'Title';
        bookmark2.idUntouched = 'file:///1';

        bookmarks = new Array<Bookmark>();
        bookmarks.push(bookmark1);
        bookmarks.push(bookmark2);
    });

    it('should save bookmark in bookmark list', () => {
        let resp: Bookmark | null = null;
        saveService.save(bookmark1).subscribe(savedBookmark => {
            resp = savedBookmark;
        });

        http.expectOne('/api/ext/pref/savedocument').flush(bookmark1);
        expect(resp).not.toBeNull();
        expect(resp!.id).toBe('1');
        expect(resp!.title).toBe('Title');
        expect(resp!.idUntouched).toBe('file:///1');
    });

    it('should not save bookmark in bookmark list', () => {
        let resp: Bookmark | null = null;
        saveService.save(bookmark1).subscribe(savedBookmark => {
            resp = savedBookmark;
        });

        http.expectOne('/api/ext/pref/savedocument').error(new ErrorEvent('error'));
        expect(resp).toBeNull();
    });

    it('should delete bookmark in bookmark list', () => {
        let resp: boolean | null = null;
        saveService.delete(bookmark1.id).subscribe(deleted => {
            resp = deleted;
        });

        http.expectOne('/api/ext/pref/saveddocument/1').flush(null);
        expect(resp).toBeTruthy();
    });

    it('should not delete bookmark in bookmark list', () => {
        let resp: boolean | null = null;
        saveService.delete(bookmark1.id).subscribe(deleted => {
            resp = deleted;
        });

        http.expectOne('/api/ext/pref/saveddocument/1').error(new ErrorEvent('error'));
        expect(resp).toBeFalsy();
    });

    it('should return all bookmarked documents', () => {
        let resp: Array<Bookmark> | null = null;
        saveService.get().subscribe(bookmarkList => {
            resp = bookmarkList;
        });

        http.expectOne('/api/ext/pref/saveddocuments').flush(bookmarks);
        expect(resp).not.toBeNull();
        expect(resp!.length).toBe(2);
    });

    it('should not return all bookmarked documents', () => {
        let resp: Array<Bookmark> | null = null;
        saveService.get().subscribe(bookmarkList => {
            resp = bookmarkList;
        });

        http.expectOne('/api/ext/pref/saveddocuments').error(new ErrorEvent('error'));
        expect(resp).not.toBeNull();
        expect(resp!.length).toBe(0);
    });

});
