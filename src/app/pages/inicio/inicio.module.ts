import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from '../qr/qr-routing.module';
import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';

/* matdatepicker y matinputmodule de misdatos en inicio

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    QrPageRoutingModule
    
    /*
    MatDatepickerModule,
    MatInputModule
    */
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
