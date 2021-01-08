import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

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
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { ReactionsTooltipComponent } from './components/reactions-tooltip/reactions-tooltip.component';
import { ReactionsDataComponent } from './components/reactions-data/reactions-data.component';
import { CommentsModalComponent } from './components/comments-modal/comments-modal.component';
import { AuthComponent } from './components/auth/auth.component';

import { AuthGuard } from '../app/auth/auth.guard';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FriendListItemComponent } from './components/friend-list-item/friend-list-item.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfilePostsComponent } from './components/user-profile-posts/user-profile-posts.component';
import { UserProfileMediaComponent } from './components/user-profile-media/user-profile-media.component';
import { UserProfileAlbumsComponent } from './components/user-profile-albums/user-profile-albums.component';
import { UserProfileFriendsComponent } from './components/user-profile-friends/user-profile-friends.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { ChatComponent } from './components/chat/chat.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  {path: 'user/:username', component: UserProfileComponent, children: [
    {path: 'posts', component: UserProfilePostsComponent},
    {path: 'media', component: UserProfileMediaComponent},
    {path: 'albums', component: UserProfileAlbumsComponent},
    {path: 'friends', component: UserProfileFriendsComponent}
  ]},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]}
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
    HomeComponent,
    CommentComponent,
    CommentFormComponent,
    ReactionsTooltipComponent,
    ReactionsDataComponent,
    CommentsModalComponent,
    AuthComponent,
    FileInputComponent,
    FriendListItemComponent,
    UserProfileComponent,
    UserProfilePostsComponent,
    UserProfileMediaComponent,
    UserProfileAlbumsComponent,
    UserProfileFriendsComponent,
    PostFormComponent,
    ChatComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
