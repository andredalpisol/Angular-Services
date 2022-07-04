import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.scss'],
})
export class ListarFuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [
    /*     { id: 1, email: 'flavio@gmail.com', nome: 'Flavio Paes', foto: '' },
    { id: 2, email: 'vitorfrank@gmail.com', nome: 'Vitor', foto: '' },
    { id: 3, email: 'maria@gmail.com', nome: 'Maria', foto: '' }, */
  ];

  colunas: string[] = ['id', 'nome', 'email', 'actions'];

  constructor(
    private funcService: FuncionarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //1 º sucesso/next -> retorna os dados
    //2 º erro ->  erro na fonte de dados
    //3 º complete -> quando fonte de dados manda todos dados
    this.recuperarFuncionarios();
  }
  /*   deletar(id: number) {
    this.funcService.deleteFuncionario(id).subscribe((next) => {
      this.funcionarios = this.funcionarios.filter((x) => x.id != id);
    });} */

  deletar(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((boolean) => {
      if (boolean) {
        this.funcService.deleteFuncionario(id).subscribe((next) => {
          this.recuperarFuncionarios();
          this.snackBar.open('Funcionario deletado com sucesso!', 'Ok', {
            duration: 3000,
          });
        });
      }
    });
  }

  recoverById(id: number) {
    this.funcService.getFuncionarioById(id).subscribe((next) => {
      alert('Funcionario recuperado com sucesso:' + next);
    });
  }

  recuperarFuncionarios(): void {
    // FUNÇÕA PARA CLEAN CODE - REUTILIZARMOS CODIGO DE MANEIRA FACIL - COLOCAMOS ELE NO ON INIT E TAMBEM NA LÓGICA PARA DELETARMOS
    this.funcService.getFuncionarios().subscribe(
      (next) => {
        this.funcionarios = next.reverse(); // REVERSE REVERTERA O ARRAY PARA QUE NA LISTA OS FUNCIONARIOS APAREÇAM DO MAIS NOVO PRO MAIS ANTIGO
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Dados enviados com sucesso');
      }
    );
  }

  //FUNÇÃO PARA ABRIR DIALOGO E EXECUTAR PUT

  openFuncionarioFormDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((sucess) => {
      this.recuperarFuncionarios();
    });
    /*     dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        console.log(value);
        this.funcService.postFuncionario(value).subscribe((sucesso) => {
          this.recuperarFuncionarios();
        });
      }
    }); */
  }
}
