

export class Aviso {
  constructor(
    public id: number,
    public titulo: string,
    public descripcion: string,
    public fecha: Date,
    public imagen: string = ''
  ) {}
}
