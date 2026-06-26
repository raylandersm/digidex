import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DigimonStoreService } from '../../domain/digimon-store.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  private readonly store = inject(DigimonStoreService);

  readonly totals = this.store.totalEntities;
  readonly latestLines = computed(() => this.store.evolutionLines().slice(0, 3));

  readonly shortcuts = [
    {
      title: 'Cadastrar Digimon',
      description: 'Inclua novos Digimons com atributos e skills.',
      route: '/digimons'
    },
    {
      title: 'Cadastrar Skills',
      description: 'Gerencie golpes, custo e poder das skills.',
      route: '/skills'
    },
    {
      title: 'Linha Evolutiva',
      description: 'Monte e mantenha as rotas de evolução.',
      route: '/evolution-lines'
    }
  ];

  resolveDigimonName(id: number): string {
    return this.store.resolveDigimonName(id);
  }
}
