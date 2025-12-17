import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private apiUrl = 'http://localhost:3000/api/auth';
  private apiUrl = 'https://chat-backend-4o9b.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  singUpUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/signup', user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', user);
  }

  authCheck(): Observable<any> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); // frontend me saved token nikalna
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<any>(`${this.apiUrl}/check`, { headers });
    } else {
      // agar server-side pe ho to empty response bhej do
      return of({ success: false });
    }
  }

  updateUser(formData: any): Observable<any> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); // frontend me saved token nikalna
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.put<any>(this.apiUrl + '/update-profile',formData,{
          headers,
        }
      );
    } else {
      return of({ success: false });
    }
  }

}

