import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    ToastModule,
    CardModule
  ]
})
export class Contact {
  name = '';
  email = '';
  message = '';

  constructor(private messageService: MessageService) {}

  sendMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Message Sent',
      detail: 'Thank you for contacting us!'
    });

    this.name = '';
    this.email = '';
    this.message = '';
  }
}
