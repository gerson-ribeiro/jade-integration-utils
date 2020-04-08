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
    this.listcards= new Array<any>();
    this.name = "";
  }

  ngOnInit(): void {
    this.generic_service.configureHttp("https://api.magicthegathering.io");

    this.search();
  }

  public search(){
    this.generic_service.list("v1/cards?name="+this.name).then((promise)=>{
      this.listcards = promise.cards;
    }).catch((error)=>{
      console.log(error);
    })
  }
}
