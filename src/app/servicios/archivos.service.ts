import { Injectable } from '@angular/core';
import { Storage, uploadBytes, getDownloadURL, ref } from '@angular/fire/storage';
// getDownloadURL, 

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  // public readonly downloadUrl$: Observable<string>;

  private imagenes: File[] = [];
  private subdirectorio: string = 'imagenes/';

  constructor( public storage: Storage ) {
    // const icon = ref(storage, 'google-g.png');
    // this.downloadUrl$ = from(getDownloadURL(icon)).pipe(
    //   keepUnstableUntilFirst,
    //   traceUntilFirst('storage'),
    //   startWith(TRANSPARENT_PNG),
    // );
  }

  limpiarImagenes() {
    this.imagenes = [];
  }

  seleccionarImagen( archivo: File, indice: number ) {
    this.imagenes[indice-1] = archivo;
  }

  // Envía al storage las imágenes cargadas en memoria
  subirArchivos( usuario: string ) {
    for ( let i=0; i<this.imagenes.length; i++) {
      const nombreArchivo = usuario + '_' + i;
      this.subirArchivo( this.imagenes[i], nombreArchivo );
    }
  }

  private subirArchivo( archivo: File, nombreArchivo: string ) {

    const storageRef = ref(this.storage);
    const imagenesRef = ref(storageRef, 'imagenes/' + nombreArchivo);
    // const archivoRef = ref(imagenesRef, 'imagen_' + indice);

    uploadBytes(imagenesRef, archivo)
      .then((snapshot) => {
      });
  }

  // Obtiene del storage la primera imagen del usuario
  async obtenerImagen_1( usuario: string ) {
    const storageRef = ref(this.storage);
    const imagen_1Ref = ref(storageRef, this.subdirectorio + usuario + '_0' );
    // return await getDownloadURL(imagen_1Ref);
    let imagenUrl = '';
    try {
      imagenUrl = await getDownloadURL(imagen_1Ref);
      // const imagenUrl = await getDownloadURL(imagen_1Ref);
    } catch(e) {
      // nada por ahora
    }
    return imagenUrl;
  }

  // Obtiene del storage las imágenes del usuario
  async obtenerImagenes( usuario: string ) {

    let imagenes = [];
    const storageRef = ref(this.storage);
    const imagen_1Ref = ref(storageRef, this.subdirectorio + usuario + '_0' );
    const imagen_2Ref = ref(storageRef, this.subdirectorio + usuario + '_1' );

    try {
    let imagenUrl$ = await getDownloadURL(imagen_1Ref);

      if (imagenUrl$) {
        imagenes.push(imagenUrl$);
        imagenUrl$ = await getDownloadURL(imagen_2Ref);

        if (imagenUrl$) {
          imagenes.push(imagenUrl$);
        }
      }
    } catch(e) {
      // nada por ahora
    }
    return imagenes;
  }

  algoConArchivos() {

    const storageRef = ref(this.storage);
    const imagenesRef = ref(storageRef, 'imagenes');

    const archivoRef = ref(imagenesRef, '[nombre del archivo]');  // Agregar algo del usuario, para evitar nombres repetidos. O un subdirectorio.

    const file = null;

    // 'file' comes from the Blob or File API
    uploadBytes(archivoRef, file)
      .then((snapshot) => {
      });





  // Create a reference from a Google Cloud Storage URI
  const gsReference = ref(this.storage, 'gs://bucket/images/stars.jpg');


  }

}
