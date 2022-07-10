import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';
import { MaterialModule } from '../material/material.module';
import { ListarIDComponent } from './pages/listar-id/listar-id.component';
import { DialogComponent } from './pages/Dialogues/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './pages/Dialogues/confirm-dialog/confirm-dialog.component';
import { RouterGuardDialogComponent } from './pages/Dialogues/router-guard-dialog/router-guard-dialog.component';

@NgModule({
  declarations: [
    ListarFuncionariosComponent,
    ListarIDComponent,
    DialogComponent,
    ConfirmDialogComponent,
    RouterGuardDialogComponent,
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FuncionariosModule {}
