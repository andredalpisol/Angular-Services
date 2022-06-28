import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';
import { MaterialModule } from '../material/material.module';
import { ListarIDComponent } from './pages/listar-id/listar-id.component';
import { DialogComponent } from './pages/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarFuncionariosComponent,
    ListarIDComponent,
    DialogComponent,
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
