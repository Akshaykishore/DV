import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import * as XLSX from 'xlsx';
import { getViewData } from '@angular/core/src/render3/state';
@Component({
  selector: 'app-data-process',
  templateUrl: './data-process.component.html',
  styleUrls: ['./data-process.component.css']
})
export class DataProcessComponent {

  loading: boolean = false;
  dataset: any;
  @ViewChild('file') filepath: ElementRef;
  @ViewChild('table') table: ElementRef;
  output: any;
  uploaded: boolean = false;
  output2: any;
  output1: any;
  output3: any;
  output4: any;
  constructor(private apiService: ApiService) { }
  upload() {
    this.loading = true;
    setTimeout(() => {
      this.getData();
    }, 2000);
  }
  getData() {
    this.apiService.sendFilePath(this.filepath.nativeElement.value).subscribe(
      data => {
        console.log(data);
        this.dataset = JSON.parse(data['input']);
        this.output1 = JSON.parse(data['output1']);
        console.log(this.dataset);
        console.log(this.output1);
        this.uploaded = true;
        this.loading = false;
      })
  }

  dataProcess1(num) {
    this.loading = true;
    setTimeout(() => {
      for (let i = 1; i <= 2; i++) {
        if (i == num) {
          let mainDiv2 = document.getElementById('mainDiv2');
          mainDiv2.style.display = "block";
        }
        else {
          let mainDiv = document.getElementById('mainDiv' + i);
          mainDiv.style.display = "none";
        }
      }
      this.loading = false;
    }, 2000);

  }

  dataProcess2(num) {
    this.loading = true;
    setTimeout(() => {
      for (let i = 1; i <= num; i++) {
        if (i == num) {
          let mainDiv3 = document.getElementById('mainDiv3');
          mainDiv3.style.display = "block";
        }
        else {
          let mainDiv = document.getElementById('mainDiv' + i);
          mainDiv.style.display = "none";
        }
      }
      this.apiService.dataProcess2(this.output1).subscribe(
        data => {
          this.output2 = JSON.parse(data['output2']);
          console.log(this.output2);
          this.loading = false;
        }
      )
    }, 2000);


  }
  dataProcess3(name) {
    for (let i = 1; i <= 4; i++) {
      if (i == 4) {
        let mainDiv4 = document.getElementById('mainDiv4');
        mainDiv4.style.display = "block";
      }
      else {
        let mainDiv = document.getElementById('mainDiv' + i);
        mainDiv.style.display = "none";
      }
    }
    this.apiService.dataProcess3(name).subscribe(
      data => {
        this.output3 = JSON.parse(data['output3']);
        console.log(JSON.parse(data['output3']));
      }
    )
    this.loading = false;
  }
  dataProcess4(num) {
    this.loading = true;
    setTimeout(() => {
      for (let i = 1; i <= num; i++) {
        if (i == num) {
          let mainDiv5 = document.getElementById('mainDiv5');
          mainDiv5.style.display = "block";
        }
        else {
          let mainDiv = document.getElementById('mainDiv' + i);
          mainDiv.style.display = "none";
        }
      }
      this.apiService.dataProcess4("table2.xlsx").subscribe(
        data => {
          this.output4 = JSON.parse(data['output4']);
          console.log(JSON.parse(data['output4']));
          this.loading = false;
        }
      )
    }, 2000);

  }

  ExportToExcel(table) {
    let tableElement = document.getElementById(table);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, table + '.xlsx');
    this.loading = true;
    setTimeout(() => {
      this.dataProcess3(table + '.xlsx');
    }, 2000);

  }
}
