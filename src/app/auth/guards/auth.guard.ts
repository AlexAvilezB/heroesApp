import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


      return this.authService.verificar()
            .pipe(
              tap( estaAutenticado => {
                if( !estaAutenticado ) {
                  this.router.navigate(['./auth/login'])
                }
              })
            )
    
    //   if (this.authService.auth.id) {
    //     return true;
    //   }
    // console.log( 'Bloqueado por Guard - CanActivate' )
    // return false;
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificar().pipe(
        tap((estaAutenticado) => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      );


    //   if (this.authService.auth.id ){
    //     return true
    //   }
    // console.log('Bloqueado por Guard - CanLoad');
    // return false;
  }
}
