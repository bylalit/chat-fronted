import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // this.socket = io('http://localhost:3000');
    this.socket = io('https://chat-backend-4o9b.onrender.com');
  }

  sendMessage(msg: any) {
    this.socket.emit('sendMessage', msg);
  }

  getMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', (msg) => {
        observer.next(msg);
      });
    });
  }
}
