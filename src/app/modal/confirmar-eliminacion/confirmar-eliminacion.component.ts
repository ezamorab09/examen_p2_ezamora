import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
//import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'


@Component({
  selector: 'app-confirmar-eliminacion',
  templateUrl: './confirmar-eliminacion.component.html',
  styleUrls: ['./confirmar-eliminacion.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ConfirmarEliminacionComponent  implements OnInit {

  @Input() id: number = 0;

  constructor(private modalCtrl: ModalController) { }


  ngOnInit() {}

  async confirmar() {
    await this.modalCtrl.dismiss({ confirmado: true, id: this.id });
  }

  async cancelar() {
    await this.modalCtrl.dismiss({ confirmado: false });
  }

}
