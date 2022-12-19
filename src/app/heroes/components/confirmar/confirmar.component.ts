import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
    `
     .center {
       text-align: center;
       color: white;
       margin: 5px;
     }
    `
  ],
})
export class ConfirmarComponent {

  constructor( private dialogRef: MatDialogRef<ConfirmarComponent>) {}

  borrar() {
    this.dialogRef.close(true);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
