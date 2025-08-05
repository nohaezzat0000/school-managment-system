import {Component, OnInit} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../service/enrollment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-enrollment-detail',
  standalone: true,
  imports: [CardModule, ButtonModule, AvatarModule, DividerModule, TranslateModule, CommonModule],
  templateUrl: './student-enrollment-detail.html',
  styleUrl: './student-enrollment-detail.css'
})
export class StudentEnrollmentDetail implements OnInit{

  student: any;
  id!: number;

  constructor(private route: ActivatedRoute, private enrollmentService: EnrollmentService) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadStudent();
  }

  loadStudent(): void {
    this.enrollmentService.getEnrollmentRequestById(this.id).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => {
        console.error('Error fetching student details:', err);
      }
    });
  }

  onAccept(): void {
    this.enrollmentService.acceptEnrollmentRequest(this.id).subscribe({
      next: () => console.log('Enrollment accepted'),
      error: (err) => console.error('Error accepting enrollment:', err)
    });
  }

  onReject(): void {
    this.enrollmentService.rejectEnrollmentRequest(this.id).subscribe({
      next: () => console.log('Enrollment rejected'),
      error: (err) => console.error('Error rejecting enrollment:', err)
    });
  }

}
