import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

    @Input() width: number;
    @Input() height: number;

    @Output() visibleChange: EventEmitter<boolean>;
    @ViewChild('dialog') dialogRef: ElementRef | null;

    _visible: boolean;
    modalListener: EventListener | null;

    constructor(
        private renderer: Renderer2
    ) {
        this._visible = false;
        this.width = 400;
        this.height = 600;
        this.visibleChange = new EventEmitter<boolean>();
        this.modalListener = null;
        this.dialogRef = null;
    }

    @Input() set visible(val: boolean) {
        this._visible = val;

        if (val) {
            this.showModal();
        }
    }

    get visible(): boolean {
        return this._visible;
    }

    /**
     * Handles OnInit event.
     */
    ngOnInit() {
        if (this.dialogRef) {
            const dialogElem = this.dialogRef.nativeElement;
            document.body.appendChild(dialogElem);
        }
    }

    /**
     * Handles OnDestroy event.
     */
    ngOnDestroy() {
        if (this.dialogRef) {
            this.dialogRef.nativeElement.remove();
        }
    }

    /**
     * Handles click on close button.
     */
    onClose() {
        this.visibleChange.emit(false);
        this.hideModal();
    }

    /**
     * Displays modal background.
     */
    showModal() {
        const modalElem = document.createElement('div');
        modalElem.classList.add('modal-background');
        this.modalListener = this.renderer.listen(modalElem, 'click', this.onClose.bind(this));
        document.body.appendChild(modalElem);
    }

    /**
     * Hides modal background.
     */
    hideModal() {
        const elem: HTMLElement | null = document.querySelector('.modal-background');

        if (elem) {
            elem.remove();
        }

        if (this.modalListener != null) {
            this.modalListener = null;
        }
    }
}
