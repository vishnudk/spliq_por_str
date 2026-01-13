import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../app/home-page/home-page';
import { LoginPage } from '../app/login-page/login-page';
import { SigninPage } from '../app/signin-page/signin-page';
import { SplashScreen } from '../app/splash-screen/splash-screen';
import { GroupPage } from '../app/group-page/group-page';
import { AddExpensePage } from '../app/add-expense-page/add-expense-page';
import { DebtDetailsPage } from '../app/debt-details-page/debt-details-page';
import { SettleExpensePage } from '../app/settle-expense-page/settle-expense-page';

export const routes: Routes = [
    { path: '', redirectTo: 'splash', pathMatch: 'full' },
    { path: 'splash', component: SplashScreen },
    { path: 'login', component: LoginPage },
    { path: 'home', component: HomePage },
    { path: 'signin', component: SigninPage },
    { path: 'group/:id', component: GroupPage },
    { path: 'group/:id/add-transaction', component: AddExpensePage },
    { path: 'debt-details/:type', component: DebtDetailsPage },
    { path: 'settle-expense/:txId', component: SettleExpensePage },
];


