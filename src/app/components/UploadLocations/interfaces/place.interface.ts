export interface Place {
  id?: string;
  name: string;
  description: string;
  categories: string[];
  imageURL: string[];
  datosGenerales: string;
  direccion: string;
  email: string;
  coordenadas: {
    latitud: number;
    longitud: number;
  };
  costos: string;
  horarios: string;
  salasDeExhibicion?: string[];
  negocio: string;
  fechaDeFundacion?: string;
}
