import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateFriendPageRoutingModule } from './rate-friend-routing.module';

import { RateFriendPage } from './rate-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateFriendPageRoutingModule
  ],
  declarations: [RateFriendPage]
})
export class RateFriendPageModule {}
