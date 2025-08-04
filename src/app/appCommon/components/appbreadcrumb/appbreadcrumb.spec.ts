import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Appbreadcrumb } from './appbreadcrumb';

describe('Appbreadcrumb', () => {
  let component: Appbreadcrumb;
  let fixture: ComponentFixture<Appbreadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Appbreadcrumb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Appbreadcrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
