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
    StorageService.set(this._AUTH,"Bearer "+auth);
  }

  public get_token(): string {
    return StorageService.get(this._AUTH);
  }

  get<T>(endpoint: string, need_auth?: boolean): Promise<T> {
    let authorization = (need_auth) ? StorageService.get(this._AUTH) : null;
    let header: { headers:{ "Content-Type":string, Authorization?: string }} = { headers: { "Content-Type": "application/json" }};

    if(authorization != null) header.headers.Authorization = authorization;

    return this.http.get<T>(this._url + endpoint, header).toPromise();
  }

  post<T>(endpoint: string, body: any,need_auth?:boolean): Promise<T> {
    let authorization = (need_auth) ? StorageService.get(this._AUTH) : null;
    let header: { headers:{ "Content-Type":string, Authorization?: string }} = { headers: { "Content-Type": "application/json" }};

    if(authorization != null) header.headers.Authorization = authorization;

    return this.http.post<T>(this._url + endpoint, body, header).toPromise();
  }

  put<T>(endpoint: string, body: any): Promise<T> {
    let authorization = StorageService.get(this._AUTH);
    let header: { headers:{ "Content-Type":string, Authorization?: string }} = { headers: { "Content-Type": "application/json" }};

    if(authorization != null) header.headers.Authorization = authorization;

      return this.http.put<T>(this._url + endpoint, body, header).toPromise();
  }

  delete<T>(endpoint: string): Promise<T> {
    let authorization = StorageService.get(this._AUTH);
    let header: { headers:{ "Content-Type":string, Authorization?: string }} = { headers: { "Content-Type": "application/json" }};

    if(authorization != null) header.headers.Authorization = authorization;

    return this.http.delete<T>(this._url + endpoint, header).toPromise();
  }
}
