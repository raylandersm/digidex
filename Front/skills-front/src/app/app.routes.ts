import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./features/dashboard/dashboard.page').then((m) => m.DashboardPageComponent),
		title: 'Dashboard Digimon'
	},
	{
		path: 'digimons',
		loadComponent: () =>
			import('./features/digimons/digimons.page').then((m) => m.DigimonsPageComponent),
		title: 'Cadastro de Digimons'
	},
	{
		path: 'skills',
		loadComponent: () =>
			import('./features/skills/skills.page').then((m) => m.SkillsPageComponent),
		title: 'Cadastro de Skills'
	},
	{
		path: 'evolution-lines',
		loadComponent: () =>
			import('./features/evolution-lines/evolution-lines.page').then(
				(m) => m.EvolutionLinesPageComponent
			),
		title: 'Linhas Evolutivas'
	},
	{
		path: '**',
		redirectTo: ''
	}
];
