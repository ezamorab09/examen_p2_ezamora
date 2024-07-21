import { Injectable } from '@angular/core';
import { Aviso } from '../modelo/aviso';
import { Preferences } from '@capacitor/preferences'

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private avisos: Aviso[] = [];

  constructor() {
    this.cargarAvisos();
   }

   async obtenerAvisos(): Promise<Aviso[]> {
    return this.avisos;
  }

  async agregarAviso(aviso: Aviso) {
    this.avisos.push(aviso);
    await this.guardarAvisos();
  }

  async eliminarAviso(id: number) {
    this.avisos = this.avisos.filter(a => a.id !== id);
    await this.guardarAvisos();
  }

  private async guardarAvisos() {
    await Preferences.set({
      key: 'avisos',
      value: JSON.stringify(this.avisos)
    });
  }

  private async cargarAvisos() {
    const { value } = await Preferences.get({ key: 'avisos' });
    this.avisos = value ? JSON.parse(value) : [];
  }
}
