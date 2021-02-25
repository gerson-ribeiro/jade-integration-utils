import { Component, OnInit } from '@angular/core';
import { Cards } from './models/cards';
import { GenericService } from 'projects/jade-integration-utils/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public filter: Cards;
  public dataService: Cards;

  constructor(
  ) {
    this.dataService = new Cards();
    this.filter = new Cards();
  }

  ngOnInit(): void {

    this.search();
  }

  public search(){
    this.dataService.resource.get(this.filter);
  }
  // public search(){
  //   this.dataService.create<any,any>({ Mail: "gerson@jedisistemas.com.br", Pass: "mainpaper2020" },'auth',false)
  //   .then((promise)=>{
  //     console.log(promise.target);
  //     this.listcards = promise.Target;
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // }
}
