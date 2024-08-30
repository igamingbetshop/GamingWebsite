import {Injectable} from "@angular/core";
import {BehaviorSubject, debounceTime, Subject} from "rxjs";

@Injectable()
export class CasinoFilterService {

  private readonly DEFAULT_PAGE_INDEX = 0;
  private readonly DEFAULT_PAGE_SIZE = 24;
  gamePattern:string = '';
  providerPattern:string = '';

  private readonly _gamePatternSbj:Subject<string> = new Subject<string>();
  private readonly _notifyGamePatternChangeSbj:Subject<string> = new Subject<string>();
  private readonly _providerPatternSbj:Subject<string> = new Subject<string>();
  private readonly _notifyProviderPatternChangeSbj:Subject<string> = new Subject<string>();
  private readonly _notifyFilterChangeSbj:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  pageIndex:number = this.DEFAULT_PAGE_INDEX;
  pageSize:number = this.DEFAULT_PAGE_SIZE;

  onProviderPatternChange$ = this._notifyProviderPatternChangeSbj.asObservable();
  onGamePatternChange$ = this._notifyGamePatternChangeSbj.asObservable();
  onFilterChange$ = this._notifyFilterChangeSbj.asObservable();

  categories:any[] = [];
  selectedCategory:any;

  providers:any[] = [];

  constructor()
  {
    this._gamePatternSbj.pipe(debounceTime(500)).subscribe(result => {
      this.gamePattern = result;
      this._notifyGamePatternChangeSbj.next(result);
      this.notifyFilterChange();
    });
    this._providerPatternSbj.pipe(debounceTime(500)).subscribe(result => {
      this.providerPattern = result;
      this._notifyProviderPatternChangeSbj.next(result);
    });
  }

  onGamePatternChange(event)
  {
    const patternQuery = (event.target as HTMLInputElement).value;
    this._gamePatternSbj.next(patternQuery?.trim());
  }

  onProviderPatternChange(event)
  {
    const patternQuery = (event.target as HTMLInputElement).value;
    this._providerPatternSbj.next(patternQuery?.trim());
  }

  addCategory(category, multiselect = false)
  {
    if(multiselect)
    {
      const index = this.categories.findIndex(cat => cat.Id == category.Id);
      if(index > -1)
      {
        this.categories.splice(index, 0);
      }
      else this.categories.push(category);
    }
    else
    {
      this.selectedCategory = category;
      this.categories = [category];
    }
    this.#resetPagination();
    this.notifyFilterChange();
  }

  addProvider(provider, multiselect = false)
  {
    if(provider.Id === 0)
    {
      this.providers = [];
    }
    else
    {
      if(multiselect)
      {
        const index = this.providers.findIndex(prov => prov.Id == provider.Id);
        if(index > -1)
        {
          this.providers.splice(index, 1);
          this.providers = [...this.providers];
        }
        else this.providers = [...this.providers, provider];
      }
      else
      {
        if (this.providers[0] && this.providers[0].Id === provider.Id)
          this.providers = [];
        else this.providers = [provider];
      }
    }
    this.#resetPagination();
    this.notifyFilterChange();
  }

  addProviders(providers)
  {
    if(!this.providers.length)
    {
      this.providers = [...providers];
      this.notifyFilterChange();
    }
  }

  private notifyFilterChange(concatData = false)
  {
    const filter = {
      providers:this.providers,
      categories:this.categories,
      gamePattern:this.gamePattern,
      pageIndex:this.pageIndex,
      pageSize:this.pageSize,
      categoryId:this.selectedCategory ? this.selectedCategory.Id : null,
      concatData:concatData
    }
    this._notifyFilterChangeSbj.next(filter);
  }

  getFilter()
  {
      return {
      providers:this.providers,
      categories:this.categories,
      gamePattern:this.gamePattern,
      pageIndex:this.pageIndex,
      pageSize:this.pageSize,
      categoryId:this.selectedCategory ? this.selectedCategory.Id : null
    }
  }




  changeCategoryFromUrl(type)
  {
    const category = {Id:null, Name:''};
    switch (type)
    {
      case 'all-games':
        category.Id = null;
        break;
      case 'my-favorites':
      case '0':
        category.Id = 0;
        break;
      default:
        category.Id = parseInt(type) || null;
        break;
    }
    this.addCategory(category);

  }

  nextPage()
  {
    this.pageIndex++;
    this.notifyFilterChange(true);
  }
  
  setPattern(pattern)
  {
    this.gamePattern = pattern
  }

  clearFilter()
  {
    this.providers = [];
    this.selectedCategory = null;
    this.gamePattern = '';
    this.categories = [];
    this.#resetPagination();
  }

  #resetPagination()
  {
    this.pageSize = this.DEFAULT_PAGE_SIZE;
    this.pageIndex = this.DEFAULT_PAGE_INDEX
  }

}
