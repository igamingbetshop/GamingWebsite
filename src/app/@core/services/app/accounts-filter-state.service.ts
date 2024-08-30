import {Injectable} from '@angular/core';
import * as moment from "moment/moment";

type StateKey = 'bets' | 'transactions' | 'payments';
@Injectable()
export class AccountsFilterStateService
{
  #betsState:any = {timeFilterIndex:0, fromDate: "", toDate:"", status:0, productId:null}
  #transactionsState:any = {timeFilterIndex:0, fromDate: "", toDate:"", status:0}
  #paymentsState:any = {timeFilterIndex:0, fromDate: "", toDate:"", status:0, type:null}

  constructor()
  {
    this.#betsState.fromDate = moment(new Date()).subtract(2, 'days').format('YYYY-MM-DDTHH:mm');
    this.#betsState.toDate = moment(new Date()).format('YYYY-MM-DDTHH:mm');

    this.#transactionsState.fromDate = moment(new Date()).subtract(2, 'days').format('YYYY-MM-DDTHH:mm');
    this.#transactionsState.toDate = moment(new Date()).format('YYYY-MM-DDTHH:mm');

    this.#paymentsState.fromDate = moment(new Date()).subtract(2, 'days').format('YYYY-MM-DDTHH:mm');
    this.#paymentsState.toDate = moment(new Date()).format('YYYY-MM-DDTHH:mm');
  }

  setState(key:StateKey, state:any)
  {
    switch (key)
    {
      case "bets":
        this.#betsState = {...this.#betsState, ...state};
        break;
      case "transactions":
        this.#transactionsState = {...this.#transactionsState, ...state};
        break;
      case "payments":
        this.#paymentsState = {...this.#paymentsState, ...state};
        break;
    }
  }

  getState(key:StateKey):any
  {
    let state = null;

    switch (key)
    {
      case "bets":
        state = this.#betsState;
        break;
      case "transactions":
        state = this.#transactionsState;
        break;
      case "payments":
        state = this.#paymentsState;
        break;
    }
    return state;
  }

}
