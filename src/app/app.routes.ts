import { Routes } from '@angular/router';
import { EntityListComponent } from './entity/entity.component';

export const routes: Routes = [
    { path: '', redirectTo: '/entities', pathMatch: 'full' },
    { path: 'entities', component: EntityListComponent }
];
