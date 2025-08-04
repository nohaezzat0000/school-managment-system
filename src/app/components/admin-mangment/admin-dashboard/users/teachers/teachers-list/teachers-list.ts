import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentService, Student} from '../../../../../../appCommon/service/student-service';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './teachers-list.html',
  styleUrl: './teachers-list.css'
})
export class TeachersList implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error('Error', err)
    });
  }

}
