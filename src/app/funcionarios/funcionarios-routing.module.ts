import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';
import { ListarIDComponent } from './pages/listar-id/listar-id.component';
import { PodeSairGuard } from './guards/pode-sair.guard';
import { PodeEntrarIdGuard } from './guards/pode-entrar-id.guard';

const routes: Routes = [
  {
    path: '',
    component: ListarFuncionariosComponent,
    children: [
      {
        path: ':idFuncionario', // PASSAMOS PARAMETRO UTILIZANDO O : ANTES
        component: ListarIDComponent,
        canDeactivate: [PodeSairGuard],
        canActivate: [PodeEntrarIdGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionariosRoutingModule { }
