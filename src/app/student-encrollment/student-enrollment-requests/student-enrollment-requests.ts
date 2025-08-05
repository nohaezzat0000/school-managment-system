import {Component, OnInit} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { EnrollmentService  } from '../service/enrollment';

interface StudentEnrollmentRequest {
  userId: number;
  studentName: string;
  studentCode: string;
  previousCertificate: string;
  totalGrade: string;
  path: string;
  registrationDate: string;
}

@Component({
  selector: 'app-student-enrollment-requests',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, TranslateModule, TooltipModule],
  templateUrl: './student-enrollment-requests.html',
  styleUrl: './student-enrollment-requests.css'
})
export class StudentEnrollmentRequests implements OnInit {

  applicants: StudentEnrollmentRequest[] = [];

  constructor(private router: Router,
              private enrollmentService: EnrollmentService ) {}

  ngOnInit():void {
    this.fetchEnrollmentRequests();
  }

  private fetchEnrollmentRequests() {
  this.enrollmentService.getAllEnrollmentRequests().subscribe({
    next: (data) => {
      this.applicants = data;
    },
    error: (err) => {
      console.error('Error fetching enrollment requests:', err);
    }
  });
  }

  viewDetails(student: StudentEnrollmentRequest) {
    this.router.navigate(['/admin/student-enrollment-detail', student.userId]);  }
}
