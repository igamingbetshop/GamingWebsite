import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()

export class MenuService {

    state:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    toggle(state?:boolean)
    {
        if(state !== undefined)
            this.state.next(state);
        else
            this.state.next(!this.state.getValue());

    }
}
