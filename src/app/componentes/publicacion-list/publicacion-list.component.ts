import { Component, Input, OnInit } from '@angular/core';
import { Aviso } from 'src/app/modelo/aviso';
//import { IonList, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionesService } from 'src/app/servicio/publicaciones.service';

@Component({
  selector: 'app-publicacion-list',
  templateUrl: './publicacion-list.component.html',
  styleUrls: ['./publicacion-list.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,IonicModule, FormsModule, CommonModule ]
})
export class PublicacionListComponent  implements OnInit {


  @Input() avisos: Aviso[] = [];

  constructor(
    private fb: FormBuilder,
    private publicacionesService: PublicacionesService,
    private router: Router,
    private formGroup : FormGroup
  ) {}

  ngOnInit() {
    this.cargarAvisos();
  }

  eliminarAviso(id: number) {
    // Lógica para eliminar un aviso
    this.publicacionesService.eliminarAviso(id);
    this.cargarAvisos();
  }

  private cargarAvisos() {

     // Ejemplo de cómo cargar avisos desde un servicio
  }

}
