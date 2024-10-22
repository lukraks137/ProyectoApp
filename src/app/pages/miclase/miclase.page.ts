import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
  
})
export class MiclasePage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  
  public usuario: Usuario;
  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  
  public asistencia: Asistencia | undefined = undefined;
  public datosQR: string = '';

  constructor(
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) { 
    this.usuario = new Usuario('', '', '', '', '', '', '',
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
    
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['asistencia']) {
        try {
          // Parseamos los datos del query param como un objeto Asistencia
          this.asistencia = JSON.parse(decodeURIComponent(params['asistencia']));
        } catch (error) {
          console.error('Error al parsear los datos de asistencia:', error);
        }
      }
    });
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
    this.animarVueltaDePagina();
  }
  
  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(5500)
      .keyframes([
        { offset: 0, transform: 'translateX(-100%)' }, // Comienza fuera del viewport
        { offset: 1, transform: 'translateX(100%)' } // Termina fuera del viewport
      ])
      .fromTo('opacity', 0.5, 1)
      .play();
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }
  
  animarVueltaDePagina() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'rotateY(deg)', 'rotateY(-180)')
      .duration(1000)
      .fromTo('transform', 'rotateY(-180deg)', 'rotateY(0deg)')
      .play();
  }
}
