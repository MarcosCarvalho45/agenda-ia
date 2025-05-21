import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoAgendaComponent } from './visualizacao-agenda.component';

describe('VisualizacaoAgendaComponent', () => {
  let component: VisualizacaoAgendaComponent;
  let fixture: ComponentFixture<VisualizacaoAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacaoAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizacaoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
