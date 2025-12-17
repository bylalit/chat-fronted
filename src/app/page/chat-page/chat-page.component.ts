import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessagesService } from '../../service/messages.service';
import { SocketService } from '../../service/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements AfterViewChecked {

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  user: any;
  users: any = [];
  selectedUser: any = null;

  messageText: string = '';
  senderId: string = '';
  receiverId: string = '';
  messages: any[] = [];

  constructor(
    private messageServices: MessagesService,
    private userServices: UserService,
    private socketServices: SocketService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Authenticate user first
    this.userServices.authCheck().subscribe((data) => {
      if (data.success) {
        this.user = data.user;
        this.senderId = data.user._id;

        this.usersShow();

        // Listen to URL changes dynamically
        this.route.paramMap.subscribe((params) => {
          this.receiverId = params.get('id') || '';
          this.selectedUser = this.users.find((u: any) => u._id === this.receiverId);
          this.loadMessages();
        });

        // Live socket messages
        this.socketServices.getMessage().subscribe((msg: any) => {
          if (
            (msg.senderId === this.receiverId && msg.receiverId === this.senderId) ||
            (msg.senderId === this.senderId && msg.receiverId === this.receiverId)
          ) {
            this.messages.push(msg);
            this.scrollToBottom();
          }
        });
      }
    });
  }

  ngAfterViewChecked() {
    // Ensure scroll after view updates
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }

  usersShow() {
    this.messageServices.allUsers().subscribe((data) => {
      // Logged-in user ko hide kar do
      this.users = data.filter((u: any) => u._id !== this.senderId);
      this.selectedUser = this.users.find((u: any) => u._id === this.receiverId);
    });
  }

  sendMessage() {
    if (this.messageText.trim() !== '') {
      const msg = {
        senderId: this.senderId,
        receiverId: this.receiverId,
        message: this.messageText
      };

      this.socketServices.sendMessage(msg);
      this.messageText = '';
    }
  }

  loadMessages() {
    if (!this.senderId || !this.receiverId) return;

    this.messageServices.getChatHistory(this.senderId, this.receiverId)
      .subscribe((data: any) => {
        this.messages = data.messages;
        this.scrollToBottom(); // scroll to bottom after messages load
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
