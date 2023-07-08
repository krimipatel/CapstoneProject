import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunityMemberRegService {
  private apiUrl = 'http://127.0.0.1:8000/community_member_reg/api/register';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
