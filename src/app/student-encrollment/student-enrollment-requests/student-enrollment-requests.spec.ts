import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollmentRequests } from './student-enrollment-requests';

describe('StudentEnrollmentRequests', () => {
  let component: StudentEnrollmentRequests;
  let fixture: ComponentFixture<StudentEnrollmentRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEnrollmentRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEnrollmentRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
