import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { ProfileComponent } from './page/profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'chatPage/:id', component: ChatPageComponent, canActivate: [authGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
];
