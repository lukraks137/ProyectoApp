import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Publicacion } from 'src/app/model/publicacion';
import { APIClientService } from 'src/app/services/apiclient.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FooterComponent]
})
export class InicioPage implements OnInit {

  listaUsuario: Usuario[] = [];
  publicaciones: Publicacion[] = [];

  constructor(private bd: DataBaseService, private api: APIClientService) {
    this.bd.listaUsuarios.subscribe((listaUsuarios) => {
      this.listaUsuario = listaUsuarios;
    });
    this.api.leerPublicaciones().subscribe((publicaciones) => {
      this.publicaciones = publicaciones;
    });
   }

  ngOnInit() {
  }

  /*usuario de prueba*/
  async crearUsuario() {
    
    await this.bd.guardarUsuario(Usuario.getNewUsuario(
      'dgonzalez', 
      'jperez@duocuc.cl', 
      '5678', 
      '¿Cuál es tu postre favorito?',
      'panqueques',
      'Perico', 
      'Los Palotes',
      NivelEducacional.buscarNivelEducacional(5)!,
      new Date(2000, 1, 10))
    );
  }

  crearPublicacion() {
    
  }

}
