import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MapDataTableDataSource } from './map-data-table-datasource';

@Component({
  selector: 'map-data-table',
  templateUrl: './map-data-table.component.html',
  styleUrls: ['./map-data-table.component.css']
})
export class MapDataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MapDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new MapDataTableDataSource(this.paginator, this.sort);
  }
}
