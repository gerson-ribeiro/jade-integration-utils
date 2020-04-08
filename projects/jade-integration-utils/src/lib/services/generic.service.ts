import { Injectable } from '@angular/core';
import { HttpStatusService } from './http-status.service';

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

  list(endpoint?: string, body?: any, need_auth?:boolean): Promise<any> {
      return this.http.get('/' + endpoint,need_auth);
  }

  listExterno(endpoint?: string, body?: any): Promise<any> {
      return this.http.get(endpoint, false);
  }

  getById(id: any, endpoint?: string): Promise<any> {
      return this.http.get('/' + endpoint + '/' + id, true);
  }

  create(body: any, endpoint?: string): Promise<any> {
      return this.http.post('/' + endpoint, body);
  }

  update(body: any, endpoint?: string): Promise<any> {
      return this.http.put('/' + endpoint, body);
  }

  delete(id: any, endpoint?: string): Promise<any> {
      return this.http.delete('/' + endpoint + '/' + id);
  }

}
