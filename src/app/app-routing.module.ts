import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'funcionarios',
    loadChildren: () =>
      import('./funcionarios/funcionarios.module').then(
        (m) => m.FuncionariosModule
      ), // função para pegar meu modulo criado "funcionarios" e importá-lo no app-component - > lazy loading, serve para carregar o modulo somente quando acessarmos
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'funcionarios'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
