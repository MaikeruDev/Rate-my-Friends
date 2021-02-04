import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileFriendPage } from './profile-friend.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileFriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileFriendPageRoutingModule {}
