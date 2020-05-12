import { Component, OnInit, Inject } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
//import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.css']
})
export class ApiDetailsComponent implements OnInit {
  
  constructor(private _getReport: NewDataService,
    //private fb: FormBuilder,
        private dialogRef: MatDialogRef<ApiDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data:any) { 
         
        }

  ngOnInit() {
    //console.log(this.data);
  }
  close() {
      this.dialogRef.close();
  }
}
