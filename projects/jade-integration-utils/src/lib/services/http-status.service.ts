import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpStatusService {

  private _url: string = '';
  private _AUTH: string = "auth";

  constructor(private http: HttpClient) { }

  public configure(url: string) {
      this._url = url;
  }

  public set_token(auth: string): void {
    StorageService.set(this._AUTH,"Bearer "+auth)
  }

  get<T>(endpoint: string, need_auth?: boolean): Promise<T> {
      let header = need_auth ? { headers: { Authorization : StorageService.get(this._AUTH) }}: null;
      if (endpoint.indexOf('http') > -1) {
        if(header) return this.http.get<T>(endpoint, header).toPromise();
        else return this.http.get<T>(endpoint).toPromise();
      }
      if(header) return this.http.get<T>(this._url + endpoint, header).toPromise();
      else return this.http.get<T>(this._url + endpoint).toPromise();
  }

  post<T>(endpoint: string, body: any): Promise<T> {
      let header = { headers: { Authorization : StorageService.get(this._AUTH) }};
      return this.http.post<T>(this._url + endpoint, body, header).toPromise();
  }

  put<T>(endpoint: string, body: any): Promise<T> {
      let header = { headers: { Authorization : StorageService.get(this._AUTH) }};
      return this.http.put<T>(this._url + endpoint, body, header).toPromise();
  }

  delete<T>(endpoint: string): Promise<T> {
      let header = { headers: { Authorization : StorageService.get(this._AUTH) }};
      return this.http.delete<T>(this._url + endpoint, header).toPromise();
  }
}
