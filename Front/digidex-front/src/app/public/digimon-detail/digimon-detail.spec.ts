import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonDetail } from './digimon-detail';

describe('DigimonDetail', () => {
  let component: DigimonDetail;
  let fixture: ComponentFixture<DigimonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigimonDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(DigimonDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
