import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonFooter, IonButton, IonIcon, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { grid, home } from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonFooter, IonToolbar, IonButton, IonIcon]
})
export class FooterComponent  implements OnInit {

  constructor(private router: Router) {
    addIcons({ home, grid});
   }

  ngOnInit() {}

  navegarInicio() {
    this.router.navigate(['/inicio'])
  }

  navegarMisDatos() {
    this.router.navigate(['/mis-datos'])
  }

}
