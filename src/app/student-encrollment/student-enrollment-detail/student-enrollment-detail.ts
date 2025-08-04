import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-enrollment-detail',
  standalone: true,
  imports: [CardModule, ButtonModule, AvatarModule, DividerModule, TranslateModule, CommonModule],
  templateUrl: './student-enrollment-detail.html',
  styleUrl: './student-enrollment-detail.css'
})
export class StudentEnrollmentDetail {
  student = {
    personalInfo: {
      fullNameArabic: 'جون سميث',
      fullNameEnglish: 'John Smith',
      nationalId: '98765432101234',
      birthDate: '2004-11-15',
      gender: 'Male',
      nationality: 'American',
      religion: 'Christianity',
      birthPlace: 'New York, USA',
      passportNumber: 'X12345678'
    },
    contactInfo: {
      mobileNumber: '+1-202-555-0188',
      email: 'john.smith@example.com',
      address: {
        governorate: 'New York',
        district: 'Manhattan',
        street: '5th Avenue',
        buildingNumber: '121'
      },
      nearestTransport: 'Central Station'
    },
    guardianInfo: {
      fullName: 'Michael Smith',
      relationship: 'Father',
      nationalId: '12349876543210',
      mobileNumber: '+1-202-555-0112',
      email: 'michael.smith@example.com',
      occupation: 'Lawyer',
      workplace: 'Smith & Partners Law Firm'
    },
    academicInfo: {
      lastCertificate: 'External Certificate',
      previousSchool: 'International High School',
      graduationYear: '2022',
      totalScore: '320',
      generalGrade: 'Excellent'
    },
    documents: {
      profilePhoto: 'assets/images/john-profile.jpg',
      certificateImage: 'assets/images/john-certificate.jpg',
      nationalIdOrBirthCert: 'assets/images/john-birth-cert.jpg',
      guardianIdImage: 'assets/images/father-id.jpg',
      achievementCertificates: [
        'assets/images/john-award1.jpg',
        'assets/images/john-award2.jpg'
      ]
    }
  };
  onAccept(): void {
    // نفذ أي إجراء قبول هنا
    console.log('Accepted');
  }

  onReject(): void {
    // نفذ أي إجراء رفض هنا
    console.log('Rejected');
  }

}
