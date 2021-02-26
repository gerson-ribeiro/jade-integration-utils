import { StorageService } from '../services/storage.service';
import { IDataService } from '../interfaces/IDataService';
import { XHRManager } from '../services/xhr-manager.service';
import { Result } from './Paginator';


export class DataService<T> implements IDataService{
  public static user_session: string = "session-user";
  public element_list: Array<T>;
  public target: T;
  public page_array : Array<number>;
  public page : number;
  public fetch : number;
  public itemsCount : number;
  public args: any;
  public results: any;
  public loading: boolean;
  public xMan : XHRManager;
  private _endpoint: string = "";

  constructor(
    api_url: string,
    endpoint:string
    ) {
    this.xMan = new XHRManager(api_url,endpoint);
    this.element_list = new Array<T>();
    this.loading = false;
    this.target = null;

    this._endpoint = endpoint;
  }

  private remove_e_query(query: string): string{
    query = query.startsWith("&") ? query.replace(query.charAt(0),"") : query;

    return query;
  }

  public getById(id: number): void{
    this.loading = true;

    this.xMan.getById<T>(id,this._endpoint)
    .then((result) => this.bind_results(result))
    .catch((error)=> this.showError(error))
    .finally(()=> this.loading = false);
  }

  private bind_results(result: Result<T>): any {
    this.page = result.page ?? this.page;
    this.fetch = result.fetch ?? this.fetch;
    this.itemsCount = result.itemsCount ?? this.itemsCount;
    if(result.objects != null) this.element_list = result.objects;
    if(result.target != null) this.target = result.target;
    this.results = result;

    this.get_pages_array();
  }

  public get(filter?: T,pagination: boolean = false): void {
    this.loading = true;
    let query = this.serialize_query(filter)+ (pagination ? '&'+this.get_pagination_query(): '');
    console.log(query);

    this.xMan.get<T>(this._endpoint,query)
    .then((result)=> this.bind_results(result))
    .catch((error)=> this.showError(error))
    .finally(()=> this.loading = false);
  }

  public getAll(pagination: boolean = false): void {
    this.loading = true;
    let pagination_query = (pagination ? this.get_pagination_query(): '');

    console.log(pagination);

    this.xMan.get<T>(this._endpoint, pagination_query)
    .then((result)=> this.bind_results(result))
    .catch((error)=> this.showError(error))
    .finally(()=> this.loading = false);
  }

  public next(filter?:T): void {
    this.page += 1;
    this.get(filter,true);
  }

  public previous(filter?: T): void {
    if(this.page > 1) this.page -= 1;
    this.get(filter,true);
  }

  /**
   * calls a http get to not configured endpoint
   *
   * @param endpoint another endpoint
   */
  public get_by_endpoint(endpoint:string,query_params?:any,pagination: boolean = false): void{
    this.loading = true;

    console.log(pagination);

    this.xMan.get<T>(endpoint+(pagination ? this.get_pagination_query(): ''))
    .then((result)=> this.bind_results(result))
    .catch((error)=> this.showError(error))
    .finally(()=> this.loading = false);
  }

  /**
   * this function calls a http post from before configured api
   *
   * @param body @optional parameter that send's a custom body
   * @param callbackHandler @optional function to call when requests finish
   */
  public create(body: any = null, callbackHandler?: any): void {
    this.loading = true;
    let body_send = body || this.target;

    this.xMan.post<T,any>(body_send,this._endpoint)
    .then((result)=>{
      this.results = result;
      if(result){
        alert("Registrado com sucesso");
        if(callbackHandler) callbackHandler(result);
      }else{
        alert("Ocorreu um erro!");
      }
    })
    .catch((error)=> this.showError(error))
    .finally(()=> this.loading = false);
  }

  /**
   * this function calls a http put from before configured api
   *
   * @param callbackHandler @optional function to call when requests finish
   *
   */
  public update(callbackHandler?: any): void {
    this.loading = true;
    this.xMan.put<any, T>(this.target,this._endpoint)
    .then((result)=>{
      this.results = result;
      if(result.target > 0){
        alert("Atualizado com sucesso");
        if(callbackHandler) callbackHandler();
      }else{
        alert("Ocorreu um erro!");
      }
    })
    .catch((error)=> this.showError(error))
    .finally(()=> this.loading = false);
  }

  /**
   * calls http DELETE to configured endpoint
   *
   * @param id Id to delete
   * @param callbackHandler a function to run after delete function as done
   */
  public delete(id:number, callbackHandler?: any): void{
    this.loading = true;
    this.xMan.delete<T>(id,this._endpoint)
    .then((results)=> {
      if(results.target){
        alert("Excluido com Sucesso!");
        if(callbackHandler) callbackHandler();
      }else{
        alert("Ocorreu um erro!");
      }
    })
    .catch((error)=> this.showError(error))
    .finally(()=> this.loading = false);
  }

  /**
   * Set's Authentication bearer
   * @param auth strings containing authentication bearer
   */
  public set_auth(auth: string):void {
    this.xMan.set_token(auth);
  }

  public get_auth(): string {
    return this.xMan.get_token();
  }
  public get_pages_array(): void {
    this.page_array = new Array<number>();
    let pagesCount = this.itemsCount / this.fetch;
    for (let index = 1; index <= pagesCount; index++) {
      this.page_array.push(index);
    }
  }
  public get_pagination_query(): string{
    return "fetch="+this.fetch+"&page="+this.page;
  }

  public show_success(msg?: string): void {
    alert(msg || 'Saved with success');
  }

  public showError(error:any):void{
    console.log("***API ERROR REPORT***");
    console.log(error);
    console.log("--------------------");
  }

  public logout():void{
    StorageService.clear();
    this.xMan.auth = '';
    window.location.reload();
  }

  public serialize_query(obj) {
    var str = [];
    for (var p in obj){
      if(typeof obj[p] === 'object'){
        for (const key in obj[p]) {
          if(p == 'resource') continue;
          if (Object.prototype.hasOwnProperty.call(obj[p], key)) {
            const element = obj[p][key];

            if(this.serialize_query(obj[p]))
              str.push(encodeURIComponent(p) + "." + this.serialize_query(obj[p]));
          }
        }
      }else if (obj.hasOwnProperty(p)) {
        if(encodeURIComponent(obj[p])) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    var results = str.join("&");

    return results;
  }

  static normalizeString(text){
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    text = text.replace(/[^a-z0-9 -]/g, '');
    return text;
  }
}
