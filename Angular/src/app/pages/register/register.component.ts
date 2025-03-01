import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el servicio de auth
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatFormFieldModule } from '@angular/material/form-field'; // Para campos de formulario
import { MatInputModule } from '@angular/material/input'; // Para inputs
import { UserRegister } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule, // Asegúrate de importar FormsModule
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  user : UserRegister = {
    correo: '',
    clave: '',
    nombre: ''
  };
  errorMessage = ''
  constructor(private authService: AuthService, private router: Router) {}



  onRegister() {
    this.authService.register(this.user).subscribe(
      { next : (res)=> { 
        this.router.navigate(['/login'])
      }, error : ()=> {
        this.errorMessage='Faltan llenar campos'
       } }
      )
    console.log('Email:', this.user.correo);
    console.log('Password:', this.user.clave);
  }
}
