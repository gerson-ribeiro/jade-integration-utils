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

  listExterno<T>(endpoint?: string, body?: T): Promise<Result<T>> {
      return this.http.get<Result<T>>(endpoint, false);
  }

  getById<T>(id: number, endpoint?: string): Promise<Result<T>> {
      return this.http.get<Result<T>>('/' + endpoint + '/' + id, true);
  }

  /**
   * Use to request POST.
   * @param body K -> K is the model dto to pass with body
   * @param endpoint String -> string to be pass with endpoint access
   */
  create<T,K>(body: K, endpoint?: string): Promise<Result<T>> {
      return this.http.post<Result<T>>('/' + endpoint, body);
  }

  /**
   * Use to request POST.
   * @param body K -> K is the model dto to pass with body
   * @param endpoint String -> string to be pass with endpoint access
   */
  update<T,K>(body: K, endpoint?: string): Promise<Result<T>> {
      return this.http.put<Result<T>>('/' + endpoint, body);
  }

  delete<T>(id: any, endpoint?: string): Promise<Result<T>> {
      return this.http.delete<Result<T>>('/' + endpoint + '/' + id);
  }
}
