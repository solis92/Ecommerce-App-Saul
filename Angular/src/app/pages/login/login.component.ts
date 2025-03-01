import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el servicio de auth
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatFormFieldModule } from '@angular/material/form-field'; // Para campos de formulario
import { MatInputModule } from '@angular/material/input'; // Para inputs
import { UserLogin } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [    
    FormsModule, // Asegúrate de importar FormsModule
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user : UserLogin = {
    correo: '',
    clave: ''
  };
  errorMessage = ''
  constructor(private authService: AuthService, private router: Router) {}



  onLogin() {
    this.authService.login(this.user).subscribe(
      { next : (res)=> { 
        localStorage.setItem('tokenBearer',res.token)
        this.router.navigate(['/'])
      }, error : ()=> {
        this.errorMessage='Usuario o clave incorrectos'
       } }
      )
    console.log('Email:', this.user.correo);
    console.log('Password:', this.user.clave);
  }

  goToRegister()
  {
    this.router.navigate(['/register'])
  }
}
