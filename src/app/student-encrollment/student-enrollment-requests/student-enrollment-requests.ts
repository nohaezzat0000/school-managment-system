import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

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
export class StudentEnrollmentRequests {
  constructor(private router: Router) {}

  Students: StudentEnrollmentRequest[] = [
    {
      userId: 1001,
      studentName: 'Ahmed Al-Fahad',
      studentCode: 'STU001',
      previousCertificate: 'High School',
      totalGrade: '95% - Excellent',
      path: 'Science - Riyadh',
      registrationDate: '2025-08-01'
    },
    {
      userId: 1002,
      studentName: 'Sara Al-Qahtani',
      studentCode: 'STU002',
      previousCertificate: 'Thanawiya',
      totalGrade: '89% - Very Good',
      path: 'Literature - Jeddah',
      registrationDate: '2025-08-02'
    },
    {
      userId: 1003,
      studentName: 'Mohammed Al-Otaibi',
      studentCode: 'STU003',
      previousCertificate: 'High School',
      totalGrade: '78% - Good',
      path: 'Science - Dammam',
      registrationDate: '2025-08-03'
    },
    {
      userId: 1004,
      studentName: 'Fatimah Al-Harbi',
      studentCode: 'STU004',
      previousCertificate: 'Thanawiya',
      totalGrade: '92% - Excellent',
      path: 'Health - Makkah',
      registrationDate: '2025-08-04'
    },
    {
      userId: 1005,
      studentName: 'Khalid Al-Dosari',
      studentCode: 'STU005',
      previousCertificate: 'High School',
      totalGrade: '85% - Very Good',
      path: 'Engineering - Abha',
      registrationDate: '2025-08-01'
    }
  ];
  viewDetails(student: StudentEnrollmentRequest) {
    this.router.navigate(['/admin/student-enrollment-detail']);
  }
}
