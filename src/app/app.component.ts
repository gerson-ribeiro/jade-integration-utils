import { Component, OnInit } from '@angular/core';
import { GenericService } from 'jade-integration-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public listcards: any;
  public name: string;

  constructor(
    public generic_service: GenericService
  ) {
    this.listcards= null;
    this.name = "";
  }

  ngOnInit(): void {
    // this.generic_service.configureHttp("https://api.magicthegathering.io");
    this.generic_service.configureHttp("https://localhost:5001/api");

    this.search();
  }

  // public search(){
  //   this.generic_service.list("v1/cards?name="+this.name).then((promise)=>{
  //     console.log(promise.Objects);
  //     this.listcards = promise.Objects;
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // }
  public search(){
    this.generic_service.create<any,any>({ Mail: "gerson@jedisistemas.com.br", Pass: "mainpaper2020" },'auth',false)
    .then((promise)=>{
      console.log(promise.target);
      this.listcards = promise.Target;
    }).catch((error)=>{
      console.log(error);
    })
  }
}
