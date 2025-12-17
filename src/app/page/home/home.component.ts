import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MessagesService } from '../../service/messages.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private messageService: MessagesService,
    private userService: UserService,
    private router: Router
  ) {}

  users: any = [];
  loggedUserId: string = '';

  ngOnInit() {

    // 1. Login user ka detail lana
    this.userService.authCheck().subscribe((data) => {
      if (data.success) {
        this.loggedUserId = data.user._id;

        // 2. Ab users list load karo
        this.usersShow();
      }
    });

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  usersShow() {
    this.messageService.allUsers().subscribe((data) => {
      this.users = data.filter((u: any) => u._id !== this.loggedUserId);
    });
  }

}
