import { Routes } from '@angular/router';
import {StudentList} from './students/student-list/student-list';
import {TeachersList} from './teachers/teachers-list/teachers-list';
import {ManagementList} from './managments/management-list/managementList';



export const routes: Routes = [
    { path: 'StudentList', component:StudentList },
    { path: 'TeachersList', component:TeachersList },
    { path: 'ManagementList', component:ManagementList },



];
