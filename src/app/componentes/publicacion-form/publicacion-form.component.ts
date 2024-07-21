import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder,Validators, ReactiveFormsModule } from '@angular/forms';
//import { IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonInput, IonDatetime, IonCardTitle, IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from "@ionic/angular/standalone";
import { Aviso } from 'src/app/modelo/aviso';
import { PublicacionesService } from 'src/app/servicio/publicaciones.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-publicacion-form',
  templateUrl: './publicacion-form.component.html',
  styleUrls: ['./publicacion-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class PublicacionFormComponent  implements OnInit {

  publicacionForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]]
  });
  fotos: string[] = [];



  @Output() publicacionCreada = new EventEmitter<Aviso>();
  avisoCreado: any;



  constructor(
    private fb: FormBuilder,
    private publicacionesService: PublicacionesService,
    private router: Router,
    private formGroup : FormGroup
  ){
    addIcons({
      arrowBackOutline
    });

    this.publicacionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      imagen: ['']
    });

  }


  ngOnInit() {
    this.publicacionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    });


  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    if (image.base64String) {
      this.fotos.push(image.base64String);
    }
  }


  crearAviso() {
    if (this.publicacionForm.valid) {
      const nuevoAviso = new Aviso(
        Date.now(),
        this.publicacionForm.value.titulo,
        this.publicacionForm.value.descripcion,
        new Date(),
        this.publicacionForm.value.fotos,

      );
      this.publicacionesService.agregarAviso(nuevoAviso);
      this.publicacionCreada.emit();
      this.publicacionForm.reset();
      this.fotos = [];

    }
  }

  eliminarFoto(foto: string) {
    // Lógica para eliminar la foto del arreglo fotos
    const index = this.fotos.indexOf(foto);
    if (index !== -1) {
      this.fotos.splice(index, 1);
    }
  }

  volverAPublicaciones() {
    this.router.navigate(['/publicaciones']);
  }
}




