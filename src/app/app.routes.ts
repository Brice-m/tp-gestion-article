import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { authGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', loadComponent: () => import('./login.component').then(m => m.LoginComponent) },
	{ path: 'signup', loadComponent: () => import('./signup.component').then(m => m.SignupComponent) },
	{ path: 'forgot', loadComponent: () => import('./forgot.component').then(m => m.ForgotComponent) },
	{ path: 'home', loadComponent: () => import('./home.component').then(m => m.HomeComponent), canActivate: [authGuard] },
	{ path: 'article/:id', loadComponent: () => import('./article-detail.component').then(m => m.ArticleDetailComponent), canActivate: [authGuard] },
	{ path: 'success', loadComponent: () => import('./success.component').then(m => m.SuccessComponent), canActivate: [authGuard] },
	{ path: '**', redirectTo: 'login' }
];
