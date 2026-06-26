import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly menuItems = [
    { label: 'Painel', route: '/' },
    { label: 'Digimons', route: '/digimons' },
    { label: 'Skills', route: '/skills' },
    { label: 'Linha Evolutiva', route: '/evolution-lines' }
  ];
}
