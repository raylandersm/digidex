import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonCadastro } from './digimon-cadastro';

describe('DigimonCadastro', () => {
  let component: DigimonCadastro;
  let fixture: ComponentFixture<DigimonCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigimonCadastro],
    }).compileComponents();

    fixture = TestBed.createComponent(DigimonCadastro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
