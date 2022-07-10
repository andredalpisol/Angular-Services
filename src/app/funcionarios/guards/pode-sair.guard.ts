import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ListarIDComponent } from '../pages/listar-id/listar-id.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterGuardDialogComponent } from '../pages/Dialogues/router-guard-dialog/router-guard-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PodeSairGuard implements CanDeactivate<ListarIDComponent> {

  constructor(private dialogue: MatDialog) { }
  canDeactivate(
    component: ListarIDComponent, // representa componente que está inserido
    currentRoute: ActivatedRouteSnapshot, //representa a rota que estamos, a partir dele conseguimos acessar o valor dos parametros
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // SE O GUARD RETORNAR TRUE -> SIGNIFICA QUE A PESSOA PODE SAIR DA PAGINA
    const nome = component.formFuncionario.value.nome;
    const email = component.formFuncionario.value.email;
    const foto = component.formFuncionario.value.foto;

    if (nome != component.funcionario.nome ||
      email != component.funcionario.email ||
      foto.length > 0) {
      const querSair = this.dialogue.open(RouterGuardDialogComponent)
      console.log(querSair.afterClosed())
      return querSair.afterClosed()
    }

    return true;

  }
}


/* nome != component.funcionario.nome ||
email != component.funcionario.email ||
foto.length > 0 */
