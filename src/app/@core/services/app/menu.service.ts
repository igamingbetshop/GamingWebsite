import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()


export class MenuService {
    private _notifyOnOpen: Subject<string> = new Subject<string>();
    public onOpen$ = this._notifyOnOpen.asObservable();

    private _notifyOnClose: Subject<string> = new Subject<string>();
    public onClose$ = this._notifyOnClose.asObservable();

    constructor() {

    }

    open(name: string) {
        this._notifyOnOpen.next(name);
    }

    close(name: any) {
        this._notifyOnClose.next(name);
    }
}
