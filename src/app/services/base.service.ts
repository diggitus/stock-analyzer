import { HttpHeaders } from '@angular/common/http';

/**
 * Base service.
 */
export class BaseService {

    static CONTENT_TYPE_HTML = 'text/html';
    static CONTENT_TYPE_JSON = 'application/json';
    static CHARSET = 'UTF-8';

    public readonly baseUrl = 'http://financials.morningstar.com';

    /**
     * Returns request headers.
     * @param contentType The content type.
     */
    getRequestHeaders(contentType: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': `${contentType};charset=${BaseService.CHARSET}`,
            'Accept': contentType
        });
    }

    /**
     * Parses a single row in a table.
     * @param tableRows A list with table row elements (tr).
     * @param label The inner content of the the table tow.
     */
    parseSingleItem(tableRows: NodeListOf<Element> | null, label: string): Array<number> {
        if (!tableRows) {
            return new Array<number>();
        }
        const result = new Array<number>();

        for (let i = 0; i < tableRows.length; i++) {
            const tableRow = tableRows[i];

            if (!tableRow.firstElementChild) {
                continue;
            }
            const firstChildLabel = tableRow.firstElementChild.innerHTML;

            if (firstChildLabel.indexOf(label) >= 0) {
                const children = tableRow.children;

                for (let j = 1; j < children.length; j++) {
                    const childElem = children[j];

                    try {
                        let label = childElem.innerHTML;
                        const idx = label.indexOf(',');

                        if (idx >= 0) {
                            label = label.slice(0, idx) + label.slice(idx + 1, label.length);
                        }
                        result.push(parseFloat(label));
                    } catch (e) {
                        continue;
                    }
                }
            }
        }
        return result;
    }

}
