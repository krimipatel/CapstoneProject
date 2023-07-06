import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunityMemberRegService {
  private apiUrl = 'http://localhost:4200/registration'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }
}
