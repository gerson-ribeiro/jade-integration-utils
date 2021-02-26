import { HttpXHRService} from "../services/http-xhr.service"
import {StorageService } from "../services/storage.service";
import { Result } from "../Models/Paginator";

export class XHRManager{
  private _auth: string = "Authentication";
  public http_xhr: HttpXHRService;
  private _endpoint: string;

  constructor(api_url:string,endpoint:string) {
    this.http_xhr = new HttpXHRService(api_url);
    this._endpoint = endpoint;
  }

  /**
   *
   * @param endpoint end point to access
   * @param queryParams = null; a string for example: name=Ronaldo&type=2 doesn't write ? \n(In case send GET without queryParams, just pass null end use endpoint to do it. Ex: cars/example)
   */
  get<T>(endpoint?: string, queryParams?: string): Promise<Result<T>> {
    let new_endpoint = '';

    if(queryParams){
      new_endpoint = '/' +endpoint+'?'+queryParams;
    }else{
      new_endpoint = '/'+ endpoint;
    }

    return this.http_xhr.get<Result<T>>(new_endpoint);
  }

  /**
   *
   * @param endpoint end point to access
   * @param queryParams = null; a string for example: name=Ronaldo&type=2 doesn't write ? \n(In case send GET without queryParams, just pass null end use endpoint to do it. Ex: cars/example)
   */
  get_file(endpoint?: string, queryParams?: string): Promise<any> {
    let new_endpoint = '';

    if(queryParams){
      new_endpoint = '/' +endpoint+'?'+queryParams;
    }else{
      new_endpoint = '/'+ endpoint;
    }

    return this.http_xhr.get_file(new_endpoint);
  }
  /**
   *
   * @param endpoint end point to access
   * @param queryParams = null; a string for example: name=Ronaldo&type=2 doesn't write ? \n(In case send GET without queryParams, just pass null end use endpoint to do it. Ex: cars/example)
   */
  get_any(endpoint?: string, queryParams?: string): Promise<any> {
    let new_endpoint = '';

    if(queryParams){
      new_endpoint = '/' +endpoint+'?'+queryParams;
    }else{
      new_endpoint = '/'+ endpoint;
    }

    return this.http_xhr.get<any>(new_endpoint);
  }

  getById<T>(id: number, endpoint?: string): Promise<Result<T>> {

    return this.http_xhr.get<Result<T>>('/' + endpoint + '/' + id);
  }

  /**
   * Use to request POST.
   * @param body K -> K is the model dto to pass with body
   * @param endpoint String -> string to be pass with endpoint access
   */
  post<T,K>(body: K, endpoint?: string): Promise<Result<T>> {
    return this.http_xhr.post<Result<T>>('/' + endpoint, body);
  }

  /**
   * Use to request formData with files
   * Don't forget.to call default_options
   * @param body K -> K is the model dto to pass with body
   * @param endpoint String -> string to be pass with endpoint access
   */
  formData<T>(body: FormData, endpoint?: string): Promise<Result<T>> {
    return this.http_xhr.formData<Result<T>>('/' + endpoint, body);
  }

  /**
   * Use to request POST.
   * @param body K -> K is the model dto to pass with body
   * @param endpoint String -> string to be pass with endpoint access
   */
  put<T,K>(body: K, endpoint?: string): Promise<Result<T>> {
    return this.http_xhr.put<Result<T>>('/' + endpoint, body);
  }

  delete<T>(id: number, endpoint?: string): Promise<Result<T>> {
    return this.http_xhr.delete<Result<T>>('/' + endpoint + '/' + id);
  }

  public set_token(auth: string): void {
    this.http_xhr.set_token(auth);
  }
  public get_token(): string {
    return this.http_xhr.get_token();
  }

  public set auth(auth: string) {
    StorageService.set(this._auth,auth);
    this.set_token(auth);
  }

  public get auth() {
    return StorageService.get(this._auth);
  }

  public downloadFile(data: any) {
    const blob = new Blob([data]);
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
