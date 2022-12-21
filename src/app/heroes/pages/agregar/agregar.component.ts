import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    characters: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
        .subscribe((heroe) => (this.heroe = heroe));
    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService
        .editarHeroe(this.heroe)
        .subscribe((resp) => this.mostrarSnack('Actualizado correctamente'));
        
    } else {
      this.heroesService.guardarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnack('Creado correctamente');
      });
    }
  }

  borrar() {

    const dialog = this.dialog.open( ConfirmarComponent, { width: '350px', height: '160px', data: {...this.heroe} } )

    dialog.afterClosed().subscribe( result => {
        if( result ) {
          this.heroesService.borrarHeroe(this.heroe.id!).subscribe((heroe) => {
            this.router.navigate(['/heroes/listado']);
          });
        }
    })
  }

  mostrarSnack( mensaje: string ) {
    this._snackBar.open( mensaje, 'Close',  {duration:2500})
  }
}
