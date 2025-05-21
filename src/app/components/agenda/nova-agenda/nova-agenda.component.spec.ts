import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaAgendaComponent } from './nova-agenda.component';

describe('NovaAgendaComponent', () => {
  let component: NovaAgendaComponent;
  let fixture: ComponentFixture<NovaAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
