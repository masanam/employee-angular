import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TutorialListComponent} from "./components/tutorial/tutorial-list/tutorial-list.component";
import {TutorialDetailsComponent} from "./components/tutorial/tutorial-details/tutorial-details.component";
import {AddTutorialComponent} from "./components/tutorial/add-tutorial/add-tutorial.component";
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialListComponent},
  { path: 'tutorials/:id', component: TutorialDetailsComponent},
  { path: 'add-tutorial', component: AddTutorialComponent },
  { path: 'employees', component: EmployeeListComponent},
  { path: 'employees/:id', component: EmployeeDetailsComponent},
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '**', component: PageNotFoundComponent }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
