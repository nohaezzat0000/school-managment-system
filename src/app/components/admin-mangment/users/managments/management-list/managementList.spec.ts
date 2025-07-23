import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementList } from './managementList';

describe('ManagementList', () => {
  let component: ManagementList;
  let fixture: ComponentFixture<ManagementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
