import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { DigimonService } from '../../core/services/digimon.service';
import { Digimon } from '../../shared/interfaces/digimon.interface';
import { FormatLabelPipe } from '../../shared/pipes/format-label.pipe';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormatLabelPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  protected readonly searchTerm = signal('');

  private readonly digimonService =
    inject(DigimonService);

  protected readonly digimons =
    signal<Digimon[]>([]);

  ngOnInit(): void {

    this.digimonService
      .listDigimon()
      .subscribe({

        next: (response) => {
          console.log(response);
          this.digimons.set(
            response
          );

        },

        error: (error) => {

          console.error(error);

        }
      });
  }

  protected readonly filteredDigimons = computed(() => {

    const term =
      this.searchTerm()
        .trim()
        .toLowerCase();

    if (!term) {

      return this.digimons();
    }

    return this.digimons().filter(
      (digimon) =>

        digimon.name
          .toLowerCase()
          .includes(term)

        ||

        digimon.type
          .toLowerCase()
          .includes(term)

        ||

        digimon.level
          .toLowerCase()
          .includes(term)

        ||

        digimon.digimonAttribute
          .toLowerCase()
          .includes(term)

        ||

        digimon.description
          .toLowerCase()
          .includes(term)
    );
  });
}