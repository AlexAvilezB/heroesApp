import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  constructor( private activatedRoute: ActivatedRoute, private heroesService: HeroesService, private router: Router ) {
  }

  heroe!:Heroe;

  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      switchMap(
        ({ id }) => this.heroesService.getHeroeById( id )
      )
    ).subscribe( resp => this.heroe = resp)

    // this.activatedRoute.params.subscribe( ({ id }) => {
    //   this.heroesService.getHeroeById(id).subscribe( data => {
    //     this.heroe = data;
    //   })
    // } )
  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }
}
