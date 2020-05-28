## JadeIntegrationUtils

A tool made for any type of http requisitions and to manage localstorage.
This package works into Angular and Ionic projects (maybe you can run this on ReactNative, MAYBE!).

## Setup

First use
```
npm install jade-integration-utils --save
```
then...

### _RESTful api Setup_

1. Declare DataService on your model:
Example:
```
export class Model extends DataService<Model>{
  constructor(genericService: GenericService) {
    super(genericService,"https://my.providers.here","my_endpoint");
    /** another things here */
  }
  public id: number;
  /** another things here  */
}
```
2. In your component, anything like that:

```
/** same imports here */
import { GenericService } from 'jade-integration-utils';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {
  public model: Model;

  constructor(
    /** Import Here */
    generic_service: GenericService
  ) { 
    /** Reference service here again */
    this.model = new Model(generic_service);
  }

  ngOnInit() {
  }

  public search():void {
    /** call find to send "get" */
    this.model.find();
  }
}

```

3. In your module, import HttpClientModule:
```
/** same imports here */
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    /** another import */
    HttpClientModule,
    /** another import */
  ],
  .
  .
  .
})
export class AppModule {}

```
After that, you can access the response of your requisition in ```this.model.results```, then you could use it in your code;

```
  <div *ngFor="let model of model.results; let index = i">
    <!-- Anything here -->
  </div>
```
To use Post and Put, you can set the attributes on ```this.model.target```, and send a body with these configuration.

```
  public save(): void{
    this.model.post(body_if_I_want,(results)=>{ /** callback function if i need */});
  }
  /** In put method you can't send a body in method, in this case, use this.model.target */
  public update(): void{
    this.model.put((results)=>{ /** callback function if i need */});
  }
```
This way you could use ```this.model.loading``` to set up html things, until the httpRequest finish.
Example:
```
  <div *if="model.loading">
    Loading ...
  </div>
  <div *if="!model.loading">
    <div *ngFor="let model of model.results; let index = i">
      <!-- Anything here -->
    </div>
  </div>
```
Okay, but I don't want to implement on models! 
What should I do?

#### Simple setup
A simple way to implement Http Requisitions:
```
export clas AnotherClassComponent 
  constructor(
    generic_service: GenericService
  ) { 
    generic_service.configureHttp("http://my.provider.here");
  }

```

Every methods on GenericService return a Promise, having this in mind, the implementation of methods would like that:

```
  public methods(): void{
    this._genericService.getById<any>(id,"endpoint")
    .then((result)=>{ /** a function to do next */})
    .catch((error)=>{})
    
    this._genericService.get<any>("endpoint","query parameters without ?")
    .then((result)=>{ /** a function to do next */})
    .catch((error)=>{})

    this._genericService.post<any,any>("body","endpoint")
    .then((result)=>{ /** a function to do next */})
    .catch((error)=>{})
    
    this._genericService.put<any, any>("body","endpoint")
    .then((result)=>{ /** a function to do next */})
    .catch((error)=>{})

    this._genericService.delete<any>("id","endpoint")
    .then((result)=>{ /** a function to do next */})
    .catch((error)=>{})
  }
```
## Local Storage

To use localstorage it's simple, inside a any function use:
To Insert:
```
  public setFoo():void{
    StorageService.set("index",object);
    // or
    StorageService.setTemp(object);
    // or
    StorageService.setSession("index",object);
  }
```
To Get:
```
  public setFoo():void{
    let index = StorageService.get("index");
    // or
    let indexTemp = StorageService.getTemp();
    // or
    let indexSession = StorageService.getSession("index");
  }
```
To Clear:
```
  public setFoo():void{
    StorageService.clearTemp();
    // or
    StorageService.clear(); // To clear all
  }
```
Like it and Share!
Enjoy!
