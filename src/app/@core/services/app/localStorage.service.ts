import { environment } from '../../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

  public get(key: string): any {
    return JSON.parse(localStorage.getItem(`${environment.projectPath}-${key}`));
  }

  public add(key: string, data: any): void {
    localStorage.setItem(`${environment.projectPath}-${key}`, JSON.stringify(data));
  }

  public remove(key: string): void {
    localStorage.removeItem(`${environment.projectPath}-${key}`);
  }

  public removeAll(): void {
    //localStorage.clear();
  }
}
