import { StorageService } from "../services/storage.service";
import { HttpMethod } from "../Models/HTTPMethod";

export class HttpXHRService {
  private _xhttp: XMLHttpRequest;
  private _standard_url: string;
  private _AUTH: string = "auth";

  constructor(standard_api_url: string) {
    this._standard_url = standard_api_url;
    this._xhttp = new XMLHttpRequest();
  }

  public set_token(auth: string): void {
    StorageService.set(this._AUTH, "Bearer " + auth);
  }

  public get_token(): string {
    return StorageService.get(this._AUTH);
  }

  get<T>(endpoint: string): Promise<T> {
    this._xhttp.open(HttpMethod.GET,this._standard_url+endpoint);

    return this._send_request<T>();
  }

  get_file<T>(endpoint: string): Promise<T> {
    this._xhttp.open(HttpMethod.GET,this._standard_url+endpoint);

    return this._send_request<T>();
  }

  post<T>(endpoint: string, body: any): Promise<T> {
    this._xhttp.open(HttpMethod.POST,this._standard_url+endpoint);

    return this._send_request<T>(body);
  }

  formData<T>(endpoint: string, body: FormData): Promise<T> {
    this._xhttp.open(HttpMethod.POST, this._standard_url+endpoint);

    return this._send_request<T>(body);
  }

  put<T>(endpoint: string, body: any): Promise<T> {
    this._xhttp.open(HttpMethod.PUT, this._standard_url+endpoint);

    return this._send_request<T>(body);
  }

  delete<T>(endpoint: string): Promise<T> {
    this._xhttp.open(HttpMethod.DELETE, this._standard_url+endpoint);

    return this._send_request<T>();
  }

  private _send_request<T>(data = null, timeout = 60000) {
    this._xhttp.setRequestHeader("Content-Type", "application/json");
    this._xhttp.setRequestHeader("Access-Control-Allow-Origin", "*" );
    this._xhttp.withCredentials = this.get_token() ? true : false;
    this._xhttp.responseType = "json";
    this._xhttp.setRequestHeader("Authorization", (this.get_token()) ? StorageService.get(this._AUTH) : null);
    return new Promise<T>((resolve, reject) => {
        this._xhttp.onreadystatechange = function() {
            if (this.readyState==4) {
                resolve(this.response);
            }
        }
        this._xhttp.send(JSON.stringify(data));
        if (timeout) {
            setTimeout(function() {
                reject("timeout");
                this._xhttp.abort();
            }, timeout);
        }
    });
  }
}
