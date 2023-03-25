import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMetaverseComponent } from './component/create-metaverse/create-metaverse.component';
import { HomeComponent } from './component/home/home.component';
import { ViewMetaverseComponent } from './component/view-metaverse/view-metaverse.component';

const routes: Routes = [
  { path: "", redirectTo: "create", pathMatch: 'full' },
  { path: "create", component: CreateMetaverseComponent },
  { path: "home", component: HomeComponent },
  { path: "view", component: ViewMetaverseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
