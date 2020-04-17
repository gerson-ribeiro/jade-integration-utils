import { Injectable } from '@angular/core';
import { HttpStatusService } from './http-status.service';
import { Result } from '../Models/Paginator';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(public http: HttpStatusService) { }

  /**
   * configureHttp
   */
  public configureHttp(url: string) {
    this.http.configure(url);
  }

  list<T>(endpoint?: string, body?: T, need_auth?:boolean): Promise<Result<T>> {
      return this.http.get<Result<T>>('/' + endpoint,need_auth);
  }

  /**
   *
   * @param endpoint end point to access
   * @param queryParams a string for example: name=Ronaldo&type=2 doesn't write ?
   */
  listExterno<T>(endpoint?: string, queryParams?: string): Promise<Result<T>> {
    return this.http.get<Result<T>>('/' +endpoint+'?'+queryParams, false);
  }

  getById<T>(id: number, endpoint?: string): Promise<Result<T>> {
      return this.http.get<Result<T>>('/' + endpoint + '/' + id, true);
  }

  /**
   * Use to request POST.
   * @param body K -> K is the model dto to pass with body
   * @param endpoint String -> string to be pass with endpoint access
   */
  create<T,K>(body: K, endpoint?: string,need_auth?:boolean): Promise<Result<T>> {
      return this.http.post<Result<T>>('/' + endpoint, body,need_auth);
  }

  /**
   * Use to request POST.
   * @param body K -> K is the model dto to pass with body
   * @param endpoint String -> string to be pass with endpoint access
   */
  update<T,K>(body: K, endpoint?: string): Promise<Result<T>> {
      return this.http.put<Result<T>>('/' + endpoint, body);
  }

  delete<T>(id: number, endpoint?: string): Promise<Result<T>> {
      return this.http.delete<Result<T>>('/' + endpoint + '/' + id);
  }

  public set_token(auth: string): void {
    this.http.set_token(auth);
  }
  public get_token(): string {
    return this.http.get_token();
  }
}
