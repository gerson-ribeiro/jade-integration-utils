import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpStatusService {

  private _url: string = '';
  private _AUTH: string = "auth";
  private _options: { headers:{ "Content-Type":string, Authorization?: string, "Access-Control-Allow-Origin"?: string ,responseType: string}};

  constructor(private http: HttpClient) {
    this._options = { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", responseType:"json"}};
  }

  public configure(url: string) {
      this._url = url;
  }

  public set_token(auth: string): void {
    StorageService.set(this._AUTH,"Bearer "+auth);

    this._options.headers.Authorization = (this.get_token()) ? StorageService.get(this._AUTH) : null;
  }

  public get_token(): string {
    return StorageService.get(this._AUTH);
  }

  get<T>(endpoint: string): Promise<T> {
    return this.http.get<T>(this._url + endpoint, this._options).toPromise();
  }

  post<T>(endpoint: string, body: any): Promise<T> {
    return this.http.post<T>(this._url + endpoint, body, this._options).toPromise();
  }

  put<T>(endpoint: string, body: any): Promise<T> {
    return this.http.put<T>(this._url + endpoint, body, this._options).toPromise();
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.http.delete<T>(this._url + endpoint, this._options).toPromise();
  }
  public set options(option){
    this._options = option;
  }
  public get options(){
    return this._options;
  }
  public default_options(){
    this._options = { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", responseType:"json"}};
  }
}
