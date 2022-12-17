import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interface/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe ): string {
    if (`assets/heroes/${heroe.id}.jpg`) {
      return `assets/heroes/${heroe.id}.jpg`;
    } else {
      return 'assets/no-image.png';
    }
  }

}
