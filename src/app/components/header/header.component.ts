import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { logOut, logOutOutline } from 'ionicons/icons';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonIcon, IonHeader, IonToolbar, IonButton]
})
export class HeaderComponent  implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) {
    addIcons ({logOutOutline})
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
      }
    })
   }

  ngOnInit() {}

  cerrarSesion() {
    this.authService.logout;
  }

}
