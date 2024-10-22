import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemCorreo', { read: ElementRef }) itemCorreo!: ElementRef;
  @ViewChild('itemPreguntaSecreta', { read: ElementRef }) itemPreguntaSecreta!: ElementRef;
  @ViewChild('itemRespuestaSecreta', { read: ElementRef }) itemRespuestaSecreta!: ElementRef;
  @ViewChild('itemPassword', { read: ElementRef }) itemPassword!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  public usuario: Usuario= new Usuario('', '', '', '', '', '', '',
    NivelEducacional.findNivelEducacionalById(1)!, undefined);

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  constructor(
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) { 
    
  }

  public ngOnInit(): void {
    this.usuario.cuenta = 'atorres';
    this.usuario.nombre = 'Ana';
    this.usuario.apellido = 'Leiva';
    this.usuario.correo = 'atorres@duocuc.cl';
    this.usuario.preguntaSecreta= '¿Cuál es tu animal favorito?';
    this.usuario.respuestaSecreta= 'gato';
    this.usuario.nivelEducacional= NivelEducacional.findNivelEducacionalById(6)!;
    this.usuario.fechaNacimiento = new Date(2000, 0, 1)
    this.usuario.password = '1234';
  }

  public limpiar1(): void {
    this.usuario.cuenta = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.correo = '';
    this.usuario.preguntaSecreta= '';
    this.usuario.respuestaSecreta= '';
    this.usuario.nivelEducacional= NivelEducacional.findNivelEducacionalById(1)!;
    this.usuario.fechaNacimiento = undefined;
    this.usuario.password = '';
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
    
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

  public mostrarDatosPersonales() {
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }


}
