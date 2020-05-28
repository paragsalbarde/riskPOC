import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'unit-filter',
  templateUrl: './unit-filter.component.html',
  styleUrls: ['./unit-filter.component.css']
})
export class UnitFilterComponent implements OnInit {

  @Input() businessUnit;
  @Input() transactionCycle;
  @Output() onFilter = new EventEmitter();
   
  public bu:string;
  public tc:string;
  constructor() { }

  ngOnInit() {
    
  }
  changeBU(event) {
    this.bu = event;
  }
  changeTC(event) {
    this.tc = event;
  }
  submitFilter() {
    let obj = {
      tc : this.tc,
      bu : this.bu
    }
    this.onFilter.emit(obj);
    console.log("Values Selectd: " + this.bu + "And" + this.tc)
 }
}
