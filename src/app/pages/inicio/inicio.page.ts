import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { trigger, state, style, transition, animate } from '@angular/animations';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  animations: [
    trigger('fadeInAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class InicioPage implements OnInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public usuario: Usuario;
  public asistencia: Asistencia | undefined = undefined;
  public escaneando = false;
  public datosQR: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController,
    private alertController: AlertController
  ) {
    this.usuario = new Usuario('', '', '', '', '', '', '',
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
    this.usuario.recibirUsuario(activatedRoute, router);
  }

  ngOnInit() {
    this.comenzarEscaneoQR();
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {

    /* para mostrar datos en la propia página
    this.datosQR = datosQR;
    this.asistencia = JSON.parse(datosQR);
    */

    this.detenerEscaneoQR();
  
    // Aquí parseamos los datos QR como un objeto Asistencia
    try {
      const asistencia: Asistencia = JSON.parse(datosQR);
      
      // Navegamos a 'miclase' pasando los datos como queryParams
      this.router.navigate(['miclase'], {
        queryParams: { asistencia: encodeURIComponent(JSON.stringify(asistencia)) }
      });
    } catch (error) {
      console.error('Error al parsear los datos del QR:', error);
    }
  }
  
  

  public detenerEscaneoQR(): void {
    this.escaneando = false;
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

}




/*import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  animations: [
    trigger('fadeInAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class InicioPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  
  public usuario: Usuario;
  

  constructor(
    private animationController: AnimationController,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {
    
    this.usuario = new Usuario('', '', '', '', '', '', '',
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(9000)
      .fromTo('transform', 'translate(-50%)', 'translate(100%)')
      .fromTo('opacity', 0.5, 1)
      .play();
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }
}

*/