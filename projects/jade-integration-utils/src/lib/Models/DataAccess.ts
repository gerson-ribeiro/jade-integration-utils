import { Injector } from '@angular/core';
import { GenericService } from '../services/generic.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpStatusService } from '../services/http-status.service';


export abstract class DataService<T> {
  public static user_session: string = "session-user";
  public element_list: Array<T>;
  public target: T;
  public args: any;
  public results: any;
  public loading: boolean;
  private _endpoint: string = "";

  constructor(
    private _genericService:GenericService,
    api_url: string,
    endpoint:string
    ) {
    this._genericService.configureHttp(api_url);

    this.element_list = new Array<T>();
    this.loading = false;
    this.target = null;

    this._endpoint = endpoint;
  }

  private remove_e_query(query: string): string{
    if(query != null){
      query = query.trim().startsWith("&") ? query.replace(query.charAt(0),"") : query;
    }
    return query;
  }

  public find(filters: string = null): void {
    this.loading = true;
    filters = this.remove_e_query(filters);

    this._genericService.get<T>(this._endpoint,filters)
    .then((result)=>{
      this.target = result.target;
      this.element_list = result.objects;
      this.results = result;
    }).catch((error)=>{
      console.log("***API ERROR REPORT***");
      console.log(error.status === 400 ? error.error : error.Message);
      console.log("--------------------");
    }).finally(()=> this.loading = false);
  }

  public find_id(id: number): void{
    this.loading = true;

    this._genericService.getById<T>(id,this._endpoint)
    .then((result)=>{
      this.target = result.target;
      this.results = result;
    }).catch((error)=>{
      console.log("***API ERROR REPORT***");
      console.log(error.status === 400 ? error.error : error.Message);
      console.log("--------------------");
    }).finally(()=> this.loading = false);
  }

  public find_another_endpoint(endpoint:string): void{
    this.loading = true;

    this._genericService.get<T>(endpoint)
    .then((result)=>{
      this.target = result.target;
      this.element_list = result.objects;
      this.results = result;
    }).catch((error)=>{
      console.log("***API ERROR REPORT***");
      console.log(error.status === 400 ? error.error : error.Message);
      console.log("--------------------");
    }).finally(()=> this.loading = false);
  }

  public post(body: any = null, callbackHandler?: any): void {
    this.loading = true;
    let body_send = body || this.target;

    this._genericService.post<T,any>(body_send,this._endpoint)
    .then((result)=>{
      this.results = result;
      if(result){
        alert("Registrado com sucesso");
        if(callbackHandler) callbackHandler(result);
      }else{
        console.log(result);
        alert("Ocorreu um erro!");
      }
    }).catch((error)=>{
      console.log("***API ERROR REPORT***");
      console.log(error.status === 400 ? error.error : error.Message);
      console.log("--------------------");
    }).finally(()=> this.loading = false);
  }

  public put(callbackHandler?: any): void {
    this.loading = true;
    this._genericService.put<any, T>(this.target,this._endpoint)
    .then((result)=>{
      this.results = result;
      if(result.target > 0){
        alert("Atualizado com sucesso");
        if(callbackHandler) callbackHandler();
      }else{
        console.log(result);
        alert("Ocorreu um erro!");
      }
    }).catch((error)=>{
      console.log("***API ERROR REPORT***");
      console.log(error.status === 400 ? error.error : error.Message);
      console.log("--------------------");
    }).finally(()=> this.loading = false);;
  }

  public delete(id:number): void{
    this.loading = true;
    this._genericService.delete<T>(id,this._endpoint)
    .then(()=> alert("Excluido com Sucesso!"))
    .catch((error)=>{
      console.log("***API ERROR REPORT***");
      console.log(error.status === 400 ? error.error : error.Message);
      console.log("--------------------");
    }).finally(()=> this.loading = false);;
  }

  public set_auth(auth: string):void {
    this._genericService.set_token(auth);
  }

  public get_auth(): string {
    return this._genericService.get_token();
  }

  public show_success(msg?: string): void {
    alert(msg || 'Saved with success');
  }
}
