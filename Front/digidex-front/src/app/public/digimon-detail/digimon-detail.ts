import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import { DigimonService } from '../../core/services/digimon.service';
import { FormatLabelPipe } from '../../shared/pipes/format-label.pipe';

@Component({
  standalone: true,
  selector: 'app-digimon-detail',
  imports: [
    CommonModule,
    RouterModule,
    FormatLabelPipe
  ],
  templateUrl: './digimon-detail.html',
  styleUrls: ['./digimon-detail.scss']
})
export class DigimonDetails implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly digimonService =
    inject(DigimonService);

  protected readonly currentDigimon =
    signal<DigimonDetail | null>(null);

  protected readonly statOrder: Array<{
    key: keyof DigimonStat;
    label: string;
  }> = [
      { key: 'hp', label: 'HP' },
      { key: 'sp', label: 'SP' },
      { key: 'atk', label: 'ATK' },
      { key: 'def', label: 'DEF' },
      { key: 'intel', label: 'INT' },
      { key: 'spi', label: 'SPI' },
      { key: 'spd', label: 'SPD' }
    ];

  ngOnInit(): void {

  this.route.paramMap
    .subscribe(params => {

      const id =
        params.get('id');

      if (!id) {
        return;
      }

      this.digimonService
        .findById(id)
        .subscribe({

          next: (response) => {

            console.log(
              'Digimon carregado:',
              response
            );

            this.currentDigimon.set(
              response
            );

          },

          error: (error) => {

            console.error(error);

          }
        });
    });
}

  protected getStatValue(
    stats: DigimonStat,
    key: keyof DigimonStat
  ): number {

    return stats[key];
  }

  protected getStatTotal(
    stats: DigimonStat
  ): number {

    return this.statOrder.reduce(
      (acc, stat) =>
        acc + stats[stat.key],
      0
    );
  }

  protected getStatFillPercent(
    baseStat: number,
    maxStat: number
  ): number {

    if (maxStat <= 0) {

      return 0;
    }

    return Math.max(
      4,
      Math.min(
        100,
        (baseStat / maxStat) * 100
      )
    );
  }

  protected getMoveIcon(
    attribute: string
  ): string {

    const normalized =
      attribute.toLowerCase();

    if (
      normalized.includes('fire') ||
      normalized.includes('flame')
    ) {

      return '🔥';
    }

    if (
      normalized.includes('ice')
    ) {

      return '❄';
    }

    if (
      normalized.includes('water')
    ) {

      return '💧';
    }

    if (
      normalized.includes('electric')
    ) {

      return '⚡';
    }

    if (
      normalized.includes('plant')
    ) {

      return '🌿';
    }

    return '⚔';
  }
}