import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/login']);
 
// Automatically log in users
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
 

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'login2',
    loadChildren: () => import('./login2/login2.module').then( m => m.Login2PageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'scoreboard',
    loadChildren: () => import('./scoreboard/scoreboard.module').then( m => m.ScoreboardPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'add-player',
    loadChildren: () => import('./add-player/add-player.module').then( m => m.AddPlayerPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./user-settings/user-settings.module').then( m => m.UserSettingsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'profile-friend',
    loadChildren: () => import('./profile-friend/profile-friend.module').then( m => m.ProfileFriendPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'rate-friend',
    loadChildren: () => import('./rate-friend/rate-friend.module').then( m => m.RateFriendPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
