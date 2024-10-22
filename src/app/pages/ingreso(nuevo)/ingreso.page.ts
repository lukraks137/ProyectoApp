import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IngresoPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() { //esto es solo para el desarrollo
    this.cuenta = 'atorres'; 
    this.password = '1234';
  }

  iniciarSesion() { //esto es solo para el desarrollo
    this.iniciarSesion
  }

}
