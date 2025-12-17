import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignup: boolean = true; // by default signup dikhega

  toggleForm() {
    this.isSignup = !this.isSignup; // toggle karne ke liye
  }

  constructor(private userService: UserService, private router: Router) {}

  onSignup(user: any) {
    // console.log('Signup data:', user.value);
    this.userService.singUpUser(user.value).subscribe((data) => {
      // console.log('Response:', data);
      // console.log(data.token);
      if(data.success){
        localStorage.setItem("token", data.token);
        // console.log("Signup successful, token saved:", data.token);
        this.router.navigate(['/']);
      }else {
        alert(data.message);
      }
    });
  }


  onLogin(user: any) {
    console.log('Login data:', user.value);
    this.userService.loginUser(user.value).subscribe((data) => {
      console.log(data);
      if(data.success){
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userData._id)
        // console.log("Login successful, token saved:", data.token);
        this.router.navigate(['/']);
      }else {
        alert(data.message);
      }
    })
  }

}
