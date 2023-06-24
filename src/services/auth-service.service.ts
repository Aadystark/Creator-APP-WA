import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  loginAuthToken: string = '';

  constructor(private http: HttpClient) { }

  getAuthToken(loginData: any) {
    return this.http.post('https://localhost:7038/Auth/Login', loginData, { responseType: 'text' });
  }
}
