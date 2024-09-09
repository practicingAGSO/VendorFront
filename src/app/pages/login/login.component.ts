import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private userService: UserService,
     private messageService: MessageService
    , private fb: FormBuilder, private router: Router
  ){

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  login(){
    this.userService.login(this.loginForm.value).subscribe(
      {
        next: (res:any) => {
          localStorage.setItem('token', res.jwt)
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Login exitoso', life: 3000 });
          this.router.navigate(['/vendors']);
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Datos incorrectos', life: 3000 })
        }
      }
    );
  }

  isValid(){
    return this.loginForm.invalid;
  }

}
