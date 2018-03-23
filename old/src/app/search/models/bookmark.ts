/**
 * This class represents a bookmark.
 *
 * @export
 * @class Bookmark
 */
export class Bookmark {
    id?: string;
    date?: number;
    idUntouched: string;
    title: string;
    link: string;
    thumbnail: string;
    contentType: string;

    /**
     * Constructor.
     */
    constructor() {
        this.idUntouched = '';
        this.title = '';
        this.link = '';
        this.thumbnail = '';
        this.contentType = '';
    }
}
