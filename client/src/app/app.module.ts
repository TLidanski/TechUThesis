import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { EnvironmentPipe } from './pipes/environment.pipe';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { UserFullnamePipe } from './pipes/user-fullname.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostMediaComponent } from './components/post-media/post-media.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostComponent,
    EnvironmentPipe,
    UserAvatarComponent,
    UserFullnamePipe,
    SidebarComponent,
    PostMediaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
