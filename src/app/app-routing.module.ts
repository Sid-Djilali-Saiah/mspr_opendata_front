import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenDataComponent } from './open-data/open-data.component';

const routes: Routes = [
  {
    path: '**',
    component: OpenDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
