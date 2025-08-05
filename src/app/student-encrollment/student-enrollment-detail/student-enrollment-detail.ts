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
        this.student = {
          personalInfo: {
            fullNameArabic: data.fullNameAr,
            fullNameEnglish: data.fullNameEn,
            nationalId: data.nationalId,
            birthDate: data.birthDate,
            gender: data.gender,
            nationality: data.nationality,
            religion: data.religion,
            birthPlace: data.placeOfBirth,
            passportNumber: data.passportNumber
          },
          contactInfo: {
            mobileNumber: data.phone,
            email: data.email,
            address: {
              governorate: '', // Not available unless you have extra fields
              district: '',
              street: '',
              buildingNumber: ''
            },
            nearestTransport: ''
          },
          guardianInfo: {
            fullName: data.guardianName,
            relationship: data.guardianRelation,
            nationalId: data.guardianNationalId,
            mobileNumber: data.guardianPhone,
            email: data.guardianEmail,
            occupation: '', // optional
            workplace: ''   // optional
          },
          academicInfo: {
            lastCertificate: data.certificateType,
            previousSchool: data.previousSchool,
            graduationYear: data.graduationYear,
            totalScore: data.totalGrade,
            generalGrade: data.generalGrade
          },
          documents: {
            profilePhoto: data.personalPhotoUrl,
            certificateImage: data.certificateUrl,
            nationalIdOrBirthCert: data.birthCertificateUrl,
            guardianIdImage: data.guardianIdUrl,
            achievementCertificates: data.extraCertificatesUrl ? [data.extraCertificatesUrl] : []
          }
        };
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
