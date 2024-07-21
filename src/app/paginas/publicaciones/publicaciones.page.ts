import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonicModule} from '@ionic/angular'
//import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { PublicacionesService } from 'src/app/servicio/publicaciones.service';
import { Aviso } from 'src/app/modelo/aviso';
import { addIcons } from 'ionicons';
import { arrowBackOutline, trashOutline } from 'ionicons/icons'
import { Router } from '@angular/router';
import { ConfirmarEliminacionComponent } from 'src/app/modal/confirmar-eliminacion/confirmar-eliminacion.component';
import { PublicacionFormComponent } from "../../componentes/publicacion-form/publicacion-form.component";
import { PublicacionListComponent } from "../../componentes/publicacion-list/publicacion-list.component";


@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, PublicacionFormComponent, PublicacionListComponent]
})
export class PublicacionesPage implements OnInit {

  avisos: Aviso[] = [];

  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router,
    private modalCtrl: ModalController ) {
    addIcons({
      arrowBackOutline,
      trashOutline
    })
   }

  async ngOnInit() {
    this.avisos = await this.publicacionesService.obtenerAvisos();
  }

  /*async agregarAviso(aviso: Aviso) {
    await this.publicacionesService.agregarAviso(aviso);
    this.avisos = await this.publicacionesService.obtenerAvisos();
  }
    */

  async agregarAviso() {
    const nuevoAviso: Aviso = {
      id: Date.now(),
      titulo: 'Nuevo Aviso',
      descripcion: 'Descripción del aviso',
      fecha: new Date(),
      imagen: '' // Puedes ajustar esto según tus necesidades
    };
    await this.publicacionesService.agregarAviso(nuevoAviso);
    this.avisos = await this.publicacionesService.obtenerAvisos();
  }


  private async cargarAvisos() {
    this.avisos = await this.publicacionesService.obtenerAvisos();
  }
/*
  async agregarAviso(aviso: Aviso) {
    await this.publicacionesService.agregarAviso(aviso);
    await this.cargarAvisos();
  }

*/


  async confirmarEliminacion(id: number) {
    const modal = await this.modalCtrl.create({
      component: ConfirmarEliminacionComponent,
      componentProps: { id }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.confirmado) {
      this.eliminarAviso(data.id);
    }
  }

  async eliminarAviso(id: number) {
    await this.publicacionesService.eliminarAviso(id);
    this.avisos = await this.publicacionesService.obtenerAvisos();
  }

  navigateToPublicacion() {
    this.router.navigate(['/publicacion']);
  }

}
