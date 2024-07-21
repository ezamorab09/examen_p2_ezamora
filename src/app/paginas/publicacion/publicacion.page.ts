import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'
//import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonItem, IonCol, IonLabel, IonNote, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Aviso } from 'src/app/modelo/aviso';
import { PublicacionesService } from 'src/app/servicio/publicaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionFormComponent } from 'src/app/componentes/publicacion-form/publicacion-form.component';
import { PublicacionListComponent } from 'src/app/componentes/publicacion-list/publicacion-list.component';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule,
    PublicacionFormComponent,PublicacionListComponent  ]
})
export class PublicacionPage implements OnInit {
  publicacionForm: FormGroup;
  fotos: string[] = [];


  constructor(
    private fb: FormBuilder,
    private publicacionesService: PublicacionesService,
    private router: Router
  ) {

    this.publicacionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    });

    addIcons({
      arrowBackOutline,

    })
  }

  ngOnInit() { }

  async tomarFoto(){

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    if( image.base64String != null || image.base64String != undefined  )  {
      this.fotos.push(image.base64String)
    }
  }

  crearAviso() {
    if (this.publicacionForm.valid) {
      const nuevoAviso = new Aviso(
        Date.now(),
        this.publicacionForm.value.titulo,
        this.publicacionForm.value.descripcion,
        this.publicacionForm.value.fecha,

      );
      this.publicacionesService.agregarAviso(nuevoAviso);
      this.volverAPublicaciones();
      this.fotos = [];
    }

  }

  volverAPublicaciones() {
    this.router.navigate(['/publicaciones']);
    }


}
