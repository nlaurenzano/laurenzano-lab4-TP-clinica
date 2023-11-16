import { Injectable } from '@angular/core';
import { Storage, uploadBytes, ref } from '@angular/fire/storage';
// getDownloadURL, 

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  // public readonly downloadUrl$: Observable<string>;

  constructor( public storage: Storage ) {
    // const icon = ref(storage, 'google-g.png');
    // this.downloadUrl$ = from(getDownloadURL(icon)).pipe(
    //   keepUnstableUntilFirst,
    //   traceUntilFirst('storage'),
    //   startWith(TRANSPARENT_PNG),
    // );
  }

  algoConArchivos() {

    const storageRef = ref(this.storage);
    const imagenesRef = ref(storageRef, 'imagenes');

    const archivoRef = ref(imagenesRef, '[nombre del archivo]');  // Agregar algo del usuario, para evitar nombres repetidos. O un subdirectorio.

    const file = null;

    // 'file' comes from the Blob or File API
    uploadBytes(archivoRef, file)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });





  // Create a reference from a Google Cloud Storage URI
  const gsReference = ref(this.storage, 'gs://bucket/images/stars.jpg');


  }

}
