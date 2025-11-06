import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../app/home-page/home-page';
import { LoginPage } from '../app/login-page/login-page';
import { SplashScreen } from '../app/splash-screen/splash-screen';

export const routes: Routes = [
    { path : '', redirectTo : 'splash', pathMatch : 'full'},
    {path :'splash', component: SplashScreen},
    { path : 'login', component: LoginPage },
    { path: 'home', component: HomePage },
];


