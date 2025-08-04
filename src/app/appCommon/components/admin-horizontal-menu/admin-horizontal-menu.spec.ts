import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHorizontalMenu } from './admin-horizontal-menu';

describe('AdminHorizontalMenu', () => {
  let component: AdminHorizontalMenu;
  let fixture: ComponentFixture<AdminHorizontalMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHorizontalMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHorizontalMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
