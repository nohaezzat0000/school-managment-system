import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollmentDetail } from './student-enrollment-detail';

describe('StudentEnrollmentDetail', () => {
  let component: StudentEnrollmentDetail;
  let fixture: ComponentFixture<StudentEnrollmentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEnrollmentDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEnrollmentDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
