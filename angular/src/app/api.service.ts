import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host = "http://localhost:9080/";
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  sendFilePath(filepath) {
    let obj = {
      path: filepath
    }
    return this.http.post(this.host + "sendFilePath", obj, this.httpOptions);
  }

  dataProcess2(dataSet) {
    return this.http.post(this.host + "step2", dataSet, this.httpOptions);
  }
  
  dataProcess3(dataSet) {
    return this.http.post(this.host + "step3", dataSet, this.httpOptions);
  }
  
}
