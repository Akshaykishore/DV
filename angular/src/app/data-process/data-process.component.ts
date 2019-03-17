import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-data-process',
  templateUrl: './data-process.component.html',
  styleUrls: ['./data-process.component.css']
})
export class DataProcessComponent {

  dataset: any;
  @ViewChild('file') filepath: ElementRef;
  @ViewChild('table') table: ElementRef;
  output: any;
  uploaded: boolean = false;
  output2: ArrayBuffer;
  output1: any;
  output3: any;
  parsedOutput: { columns: string; data: string; index: string; };
  constructor(private apiService: ApiService) { }
  upload() {
    this.apiService.sendFilePath(this.filepath.nativeElement.value).subscribe(
      data => {
        console.log(data);
        this.dataset = JSON.parse(data['input']);
        this.output1 = JSON.parse(data['output1']);
        console.log(this.dataset);
        console.log(this.output1);
        this.uploaded = true;
      })
  }

  dataProcess1(num) {
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
  }

  dataProcess2(num) {
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
        this.parsedOutput = {
          columns: '',
          data: '',
          index: ''
        }
        this.parsedOutput.columns = JSON.parse(data['output2'])['columns'][0];
        this.parsedOutput.data = JSON.parse(data['output2'])['data'][0];
        this.parsedOutput.index = JSON.parse(data['output2'])['index'][0];
        console.log(this.parsedOutput);

  }
    )

}
dataProcess3(num) {
  this.apiService.dataProcess3(this.parsedOutput).subscribe(
    data => {
      this.output3 = JSON.parse(data['output3']);
      console.log(JSON.parse(data['output3']));
    }
  )
}

ExportToExcel() {
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  /* save to file */
  XLSX.writeFile(wb, 'output.xlsx');
}
}
