## JadeIntegrationUtils

A tool made for any type of http requisitions and to manage localstorage.
This package works into Angular and Ionic projects (maybe you can run this in ReactNative, MAYBE!).

## Setup

Installation
```
npm install jade-integration-utils --save
```
then...

### _RESTful api Setup_

1. Declare DataService on your model:
Example:
```
export class Model{  
  constructor() {
    this.resource = new DataService<Model>("http://your.api.service","your.endpoint");
  }
  //You must implement the integration source with property name "resource". 
  //If you didn't, the DataService object will break when call every get method.
  public resource: DataService<Model>;
  public id: number;
  public name: string;
  /** another things here  */
}
```
2. In your component,you can implement like this example:

```
(...)
@Component({
  selector: 'app-model',
  templateUrl: '
  <input type="text" name="id" [(ngModel)]="filter.id" (keydown.enter)="search()">
  <button (click)="search()">Procurar</button>
  <div *ngIf="this.model.resource.loading">
    Carregando...
  </div>
  <div *ngIf="!this.model.resource.loading" style="display:block; max-width: 100%;">
    <div *ngFor="let OBJECT of model.resource.results.MY-LIST-OBJECT" style="text-align: center; width:100px;">
      ...
    </div>
  </div>
  ',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {
  public model: Model;
  public filter: Model;

  constructor(
    /** Import Here */
  ) { 
    this.model = new Model();
    this.filter = new Model();
  }

  ngOnInit() {
    this.search();
  }

  public search():void {
    /** call get to send "get" */
    this.model.resource.get(this.filter);
  }
}

```

#### OPTIONAL - Pagination in 4.x.x version!
You could use pagination with the framework as optional way to implement.
Note: In this case, I use ```*ngFor="let your_model_object of model.resource.results.element_list"``` to get list of response, but it is necessary implements "objects" to your get method to return this info.
```
@Component({
  selector: 'app-model',
  templateUrl: '
  <input type="text" name="name" [(ngModel)]="filter.name" (keydown.enter)="search()">
  <button (click)="search()">Procurar</button>
  <div *ngIf="this.model.resource.loading">
    Carregando...
  </div>
  <div *ngIf="!this.model.resource.loading" style="display:block; max-width: 100%;">
    <div *ngFor="let your_model_object of model.resource.results.element_list" style="text-align: center; width:100px;">
      ...
    </div>
    ...
    <div *ngIf="model.resource.page_array.lenght > 2 ">
      <button (click)="model.resource.previous()">Previous</button>
      <div *ngFor="let indexPage of model.resource.page_array">
        <button (click)="to_page(indexPage)">{{indexPage}}</button>
      </div>
      <button (click)="model.resource.next()">Next</button>
    </div>
  </div>
  ',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {
  public model: Model;
  public filter: Model;

  constructor(
    /** Import Here */
  ) { 
    this.model = new Model();
    this.filter = new Model();
  }

  ngOnInit() {
    this.search();
  }

  public search():void {
    /** call get with second paramater like true to use PagedResults */
    this.model.resource.get(this.filter,true);
  }
  
  public to_page(indexPage): void{
    this.model.resource.page = indexPage;
    
    this.search();
  }
}
```
For that example, your Back-End service must accept page, fetch and itemsCount as queryParameters to filter.
Here is a single example of backend service required returns to this feature:
```
{
    "itemsCount": 50,
    "page": 2,
    "fetch": 10,
    "objects": [
      ...
    ],
    "target": {"your_object":null}
}
```
To use Post and Put, you can set the attributes on ```this.model.resource.target```, and send a body with these configuration.
Api's return you can retrive with ```this.model.resource.results```.
```
  public save(): void{
    this.model.resource.create(body_if_I_want,(results)=>{ /** callback function if i need */});
  }
  /** In put method you can't send a body in method, in this case, use this.model.target */
  public update(): void{
    this.model.resource.update((results)=>{ /** callback function if i need */});
  }
```
You could use ```this.model.resource.loading``` to set up html blocks until httpRequest finish.
Example:
```
  <div *if="model.resource.loading">
    Loading ...
  </div>
  <div *if="!model.resource.loading">
    <div *ngFor="let model of model.resource.results; let index = i">
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
  public getFoo():void{
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
