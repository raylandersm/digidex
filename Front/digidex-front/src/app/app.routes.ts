import { Routes } from '@angular/router';
import { Home } from './public/home/home';
import { DigimonDetails } from './public/digimon-detail/digimon-detail';
import { DigimonCadastro } from './admin/digimon/digimon-cadastro/digimon-cadastro';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'digimon/:id',
    component: DigimonDetails
  },
  {
    path: 'admin/digimon/cadastro',
    component: DigimonCadastro
  }
];
