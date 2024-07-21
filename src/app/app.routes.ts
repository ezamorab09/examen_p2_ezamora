import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'publicaciones',
    pathMatch: 'full',
  },
  {
    path: 'publicacion',
    loadComponent: () => import('./paginas/publicacion/publicacion.page').then( m => m.PublicacionPage)
  },
  {
    path: 'publicaciones',
    loadComponent: () => import('./paginas/publicaciones/publicaciones.page').then( m => m.PublicacionesPage)
  },
];
