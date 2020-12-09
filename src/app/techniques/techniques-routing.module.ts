import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechniquesPage } from './technique-set-list/techniques.page';
import { TechniqueListPage } from './technique-list/technique-list.page';
import { TechniquePage } from './technique/technique.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
    },
    {
        path: 'list/favourites',
        redirectTo: 'list',
    },
    {
        path: 'list/:type/:id',
        component: TechniqueListPage,
    },
    {
        path: 'list',
        pathMatch: 'full',
        component: TechniquesPage,
    },
    {
        path: ':id',
        component: TechniquePage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TechniquesPageRoutingModule {}
