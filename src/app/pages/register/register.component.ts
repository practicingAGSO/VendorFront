import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]

})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(private userService: UserService,
     private messageService: MessageService
    , private fb: FormBuilder, private router: Router
  ){

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  register(){
    this.userService.register(this.registerForm.value).subscribe(
      {
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso', life: 3000 });
          this.router.navigate(['/login']);
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error', life: 3000 })
        }
      }
    );
  }

  isValid(){
    return this.registerForm.invalid;
  }

}