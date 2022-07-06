import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';
import { ListarIDComponent } from './pages/listar-id/listar-id.component';
import { ConfirmDialogComponent } from './pages/confirm-dialog/confirm-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ListarFuncionariosComponent,
    children: [
      {
        path: ':idFuncionario', // PASSAMOS PARAMETRO UTILIZANDO O : ANTES
        component: ListarIDComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionariosRoutingModule {}
