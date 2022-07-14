import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PodeEntrarIdGuard implements CanActivate {

  constructor(private snackBar: MatSnackBar, private rota: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* 
          isNaN() informa se o valor passado como parametro não é um numero */

    let idRota = parseInt(route.paramMap.get('idFuncionario')!)




    if (isNaN(idRota)) {

      this.snackBar.open('Erro! ID informado não é um numero', 'Ok', { duration: 3000 })
      return this.rota.parseUrl('/funcionarios')

    }
    return true;

  }
}
