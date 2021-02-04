import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileFriendPageRoutingModule } from './profile-friend-routing.module';

import { ProfileFriendPage } from './profile-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileFriendPageRoutingModule
  ],
  declarations: [ProfileFriendPage]
})
export class ProfileFriendPageModule {}
