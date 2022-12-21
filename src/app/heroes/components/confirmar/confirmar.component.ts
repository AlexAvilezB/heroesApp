import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interface/heroes.interface';

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
    `,
  ],
})
export class ConfirmarComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) {}

  borrar() {
    this.dialogRef.close(true);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
