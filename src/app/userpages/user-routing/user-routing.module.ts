import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'addmovie',
    loadChildren: () =>
      import('../dashboard/addmovie/addmovie.module').then(
        (m) => m.AddmoviePageModule
      ),
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule, HttpClientModule],
})
export class UserRoutingModule {}
