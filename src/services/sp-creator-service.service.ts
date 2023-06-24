import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpCreatorServiceService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://localhost:7038/Details/GetData');
  }

  getTableData() {
    return this.http.get('https://localhost:7038/Details/GetTableData');
  }

  getSPData() {
    return this.http.get('https://localhost:7038/Details/GetSPData');
  }

  saveSPData(data: any) {
    return this.http.post('https://localhost:7038/Details/PostSPData', data, { responseType: 'text'});
  }
}
