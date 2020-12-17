import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard, StudentGuard } from 'hapkido-auth-lib';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        canActivate: [AuthenticationGuard, StudentGuard],
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: 'attendance',
        loadChildren: () =>
            import('./attendance/attendance.module').then(
                (m) => m.AttendancePageModule
            ),
        canActivate: [AuthenticationGuard, StudentGuard],
    },
    {
        path: 'grades',
        loadChildren: () =>
            import('./gradings/gradings.module').then(
                (m) => m.GradingsPageModule
            ),
        canActivate: [AuthenticationGuard, StudentGuard],
    },
    {
        path: 'authentication',
        loadChildren: () =>
            import('./authentication/authentication.module').then(
                (m) => m.AuthenticationWrapperModule
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
        loadChildren: () =>
            import('./techniques/techniques.module').then(
                (m) => m.TechniquesPageModule
            ),
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('./profile/profile.module').then((m) => m.ProfilePageModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
