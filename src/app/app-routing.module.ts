import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component'
import { DetailsComponent } from './details/details.component'
import { PostsComponent } from './posts/posts.component'
import { InteractionsComponent } from './interactions/interactions.component';
import { CalculatorComponent } from './calculator/calculator.component';


const routes: Routes = [{
  path: '',
  component: UsersComponent
}, {
  path: 'user/:id',
  component: DetailsComponent
}, {
  path: 'posts',
  component: PostsComponent
},
{
  path: 'interactions',
  component: InteractionsComponent
}, {
  path: 'calculator',
  component: CalculatorComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
