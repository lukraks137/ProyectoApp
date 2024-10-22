import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonTabButton, IonIcon, IonLabel, IonButton } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer-old/footer.component';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.page.html',
  styleUrls: ['./mis-datos.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonIcon, IonTabButton, IonInput, IonContent, IonHeader, 
    IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class MisDatosPage implements OnInit {
  usuario: Usuario = new Usuario();

  constructor(private auth:AuthService) {
    this.auth.leerUsuarioAutenticado().then((usuario)=>{ 
      if(usuario){
        this.usuario=usuario;
      }
    });

   }

  ngOnInit() {
  }

  async guardar(){
    
    this.usuario.guardarUsuario();
    this.auth.guardarUsuarioAutenticado(this.usuario);
  }

}
