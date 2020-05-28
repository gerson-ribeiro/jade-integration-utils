export interface IDataService {
  find(filters?: string): void ;
  find_id(id: number): void;
  find_another_endpoint(endpoint:string): void;
  post(body?: any, url_redirect?: string): void ;
  put(url_redirect: string): void ;
  delete(id:number): void;
  set_auth(auth: string):void;
  set_endpoint(endpoint : string);
  get_auth(): string;
  set_api_url(api_url : string);
}
