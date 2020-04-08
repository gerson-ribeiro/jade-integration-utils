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

  get(endpoint: string, need_auth?: boolean): Promise<any> {
      let header = need_auth ? { headers: { Authorization : StorageService.get(this._AUTH) }}: null;
      if (endpoint.indexOf('http') > -1) {
        if(header) return this.http.get(endpoint, header).toPromise();
        else return this.http.get(endpoint).toPromise();
      }
      if(header) return this.http.get(this._url + endpoint, header).toPromise();
      else return this.http.get(this._url + endpoint).toPromise();
  }

  post(endpoint: string, body: any): Promise<any> {
      let header = { headers: { Authorization : StorageService.get(this._AUTH) }};
      return this.http.post(this._url + endpoint, body, header).toPromise();
  }

  put(endpoint: string, body: any): Promise<any> {
      let header = { headers: { Authorization : StorageService.get(this._AUTH) }};
      return this.http.put(this._url + endpoint, body, header).toPromise();
  }

  delete(endpoint: string): Promise<any> {
      let header = { headers: { Authorization : StorageService.get(this._AUTH) }};
      return this.http.delete(this._url + endpoint, header).toPromise();
  }
}
