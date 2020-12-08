import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthenticationGuard, StudentGuard} from 'hapkido-auth-lib';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard, StudentGuard],
  },
  {
    path: 'home',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard, StudentGuard],
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthenticationGuard, StudentGuard],
  },
  {
    path: 'authentication',
    loadChildren: () =>
        import('./authentication/authentication.module').then(
            m => m.AuthenticationWrapperModule
        ),
  },
  {
    path: 'sign-in',
    redirectTo: '/authentication/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'technique',
    canActivate: [AuthenticationGuard, StudentGuard],
    loadChildren: () => import('./techniques/techniques.module').then( m => m.TechniquesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
