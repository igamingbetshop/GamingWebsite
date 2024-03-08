import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {getParsedUrl, isMobileUrl} from "@core/utils";

@Injectable()
export class StateService
{
  private _providersPopupState = new BehaviorSubject<boolean>(false);
  providersPopupState$ = this._providersPopupState.asObservable();

  private _categoriesSearchViewState = new BehaviorSubject<boolean>(false);
  categoriesSearchViewState$ = this._categoriesSearchViewState.asObservable();

  private _isMobileFromUrl:boolean = isMobileUrl() || getParsedUrl(location.href).isForMobile === "true" || getParsedUrl(location.href).isForMobile === "false" || undefined;
  private readonly _isMobile = new BehaviorSubject<boolean>(this.getResolution());
  readonly isMobile$ = this._isMobile.asObservable();

  private readonly _compactViewState = new BehaviorSubject<string>('matchesState');
  readonly compactViewState$ = this._compactViewState.asObservable();

  private readonly _openModal = new Subject<any>();
  readonly onOpenModal$ = this._openModal.asObservable();

  private readonly _chatState = new BehaviorSubject<string>("hidden");
  readonly onChatStateChange$ = this._chatState.asObservable();

  private readonly _desktopHeaderResize = new BehaviorSubject<string>("calc(100vh - 117px)");
  public readonly onDesktopHeaderResize$ = this._desktopHeaderResize.asObservable();


  constructor()
  {
      window.addEventListener('resize', this.onResize);
      window.addEventListener('onChatStateChanged', this.onChatStateChanged);
  }

   changeProvidersPopupState(newState: boolean)
  {
    this._providersPopupState.next(newState);
  }

  changeCategoriesSearchViewState(newState: boolean)
  {
    this._categoriesSearchViewState.next(newState);
  }

  /*Detect resolution*/

    onResize = (event) =>
    {
        const newResolution =  this.getResolution();

        if(this._isMobile.getValue() !== newResolution)
            this._isMobile.next(newResolution);
    }

    getResolution():boolean
    {
      if(this._isMobileFromUrl !== undefined)
        return this._isMobileFromUrl;
      else
        return matchMedia('(max-width: 1200px)').matches;
    }
  /*Compact view states*/
    setCompactViewState(state:string)
    {
      if(this.getCompactViewState !== state)
        this._compactViewState.next(state);
    }
    get getCompactViewState():string
    {
      return this._compactViewState.getValue();
    }
  /*Compact view states end*/
    get getProductBackUrl():string
    {
      return localStorage.getItem('opened-url') || '';
    }

    setProductBackUrl(url)
    {
      localStorage.setItem('opened-url', url);
    }

    openModal(data)
    {
        this._openModal.next(data);
    }

    setPaymentNavigationState(state:string, forceUpdate = false)
    {
      if(!state)
      {
        if(forceUpdate === true || this.getPaymentNavigationState !== "fromProfile")
          sessionStorage.clear();
      }
      else sessionStorage.setItem("paymentNavigationState", state);
    }
    get getPaymentNavigationState():string
    {
      return sessionStorage.getItem("paymentNavigationState");
    }

  /*Chat state*/

  onChatStateChanged = (event) =>
  {
      this._chatState.next(event.detail.state);
  }

  toggleChat(state?)
  {
    let chatState:string;
    if(state)
    {
      chatState = state;
    }
    else
    {
      chatState = this.chatState === "hidden" ? 'maximize' : 'hide';
    }
    const event = new CustomEvent("chatStateChange", {detail:{state:chatState}});
    window.dispatchEvent(event);
  }

  get chatState():string
  {
    return this._chatState.getValue();
  }

  /*Chat state end*/

  /*Desktop header state*/

  setDesktopHeaderSize(sizes:any)
  {
    const productHeight:string = ` calc(100vh - ${sizes.height}px)`;
    sizes.productHeight = productHeight || "calc(100vh - 117px)";
    this._desktopHeaderResize.next(sizes);
  }
}
