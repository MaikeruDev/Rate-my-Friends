import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateFriendPage } from './rate-friend.page';

const routes: Routes = [
  {
    path: '',
    component: RateFriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateFriendPageRoutingModule {}
