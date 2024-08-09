import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './common/guards/auth.guard';
import { ExpensesComponent } from './expense/expenses/expenses.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { UsersComponent } from './user/users/users.component';
import { Role } from './common/types/user.interface';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'expenses',
        component: ExpensesComponent,
      },
      {
        path: 'analysis',
        component: AnalysisComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          roles: [Role.Admin],
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'expenses',
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
