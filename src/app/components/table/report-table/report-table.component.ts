import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReporttableComponent implements OnInit {
  @Input() tableData;
   
  constructor( ) { }

  ngOnInit() {
    //console.log(this.tableData)
  }
}
