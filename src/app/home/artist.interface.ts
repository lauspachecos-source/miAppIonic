export interface Artist {
  id: number;          
  name: string;        
  image: string;       
  
  // Opcionales para que no marquen error 
  // cuando la API no los traiga pues la API no trae 'pais' o 'anios_activo')
  nombre?: string;     
  genero?: string;
  pais?: string;
  anios_activo?: string;
  
  // genres es como lo devuelve la API (un array de strings)
  genres?: string[];

  // álbumes opcional
  albumes?: Array<{
    titulo: string;
    anio: number;
    imagen: string;
  }>;

  followers?: number;
  popularity?: number;
}