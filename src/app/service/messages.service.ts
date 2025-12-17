import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  // private apiUrl = 'http://localhost:3000/api/messages';
  private apiUrl = 'https://chat-backend-4o9b.onrender.com/api/messages';


  constructor(private http: HttpClient) { }

  // ✔ All users fetch
  allUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // ✔ Get all chat messages between two users
  getMessages(senderId: string, receiverId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${senderId}/${receiverId}`);
  }

  // ✔ Save message (if using REST also, optional)
  saveMessage(messageData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, messageData);
  }

  getChatHistory(senderId: string, receiverId: string) {
    return this.http.get<any>(`${this.apiUrl}/${senderId}/${receiverId}`);
  }

}
