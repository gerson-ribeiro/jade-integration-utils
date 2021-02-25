export interface IDataService {
  getById(id: number): void;
  get(): void ;
  getAll(): void ;
  next(): void ;
  previous(): void ;
  get_by_endpoint(endpoint:string): void;
  create(body: any, callbackHandler?: any): void ;
  update(callbackHandler?: any): void ;
  delete(id:number, callbackHandler?: any): void;
  set_auth(auth: string):void ;
  get_auth(): string ;
  get_pages_array(): void ;
  get_pagination_query(): string;
  show_success(msg?: string): void ;
  showError(error:any):void;
  logout():void;
  serialize_query(obj) ;
}
