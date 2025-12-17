import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private userServices: UserService) {}

  user: any;

  // 🔔 Alert variables
  updateSuccess = false;
  updateError = false;
  message = '';

  // Reactive form
  userData = new FormGroup({
    name: new FormControl(''),
    bio: new FormControl(''),
    image: new FormControl(null),
  });

  ngOnInit() {
    this.userServices.authCheck().subscribe((data: any) => {
      if (data.success) {
        this.user = data.user;

        // patch existing values
        this.userData.patchValue({
          name: this.user.name,
          bio: this.user.bio,
        });
      }
    });
  }

  // file store karne ke liye
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.userData.patchValue({ image: file });
      this.userData.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.userData.invalid) return;

    const formData = new FormData();
    formData.append('name', this.userData.value.name || '');
    formData.append('bio', this.userData.value.bio || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.userServices.updateUser(formData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.updateSuccess = true;
          this.updateError = false;
          this.message = 'Profile updated successfully ✅';

          // 🔄 update local user data (instant UI update)
          this.user = res.user;

          // auto hide alert after 3 sec
          setTimeout(() => {
            this.updateSuccess = false;
          }, 3000);
        } else {
          this.updateError = true;
          this.updateSuccess = false;
          this.message = 'Profile update failed ❌';
        }
      },
      error: () => {
        this.updateError = true;
        this.updateSuccess = false;
        this.message = 'Server error ❌';
      },
    });
  }
}
