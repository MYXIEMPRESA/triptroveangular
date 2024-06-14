export default interface Place {
  id?: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  image?: File; // Esto es opcional si se carga desde el formulario
  imageURL?: string;
  categories?: string[];
  adscripcion?: string;
  costos?: string;
  datosGenerales?: string;
  direccion?: string;
  email?: string;
  empresa?: string;
  horarios?: string;
  negocio?: string;
  salasDeExhibicion?: string[];
  url?: string;
}
