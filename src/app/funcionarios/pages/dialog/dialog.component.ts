import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private funcService: FuncionarioService,
    private dialogRef: MatDialogRef<DialogComponent>, //objeto que permite controlar o dialog aberto
    private snackBar: MatSnackBar
  ) {}

  funcionarioForm: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  foto!: File;
  fotoPreview: string = '';

  ngOnInit(): void {}

  // função para recuperar a foto e dps mostrá-la
  recuperarFoto(event: any): void {
    this.foto = event.target.files[0];
    this.carregarPreview();
  }

  // função para carregar a foto
  carregarPreview(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.foto);
    reader.onload = () => {
      this.fotoPreview = reader.result as string;
    };
  }

  //AQUI ESTAMOS SEGUINDO A TIPAGEM DA FUNÇÃO -> Observable<Promise<Observable<Funcionario>
  salvar(): void {
    const f: Funcionario = this.funcionarioForm.value;
    f.foto = '';

    this.funcService.salvarFuncionario(f, this.foto).subscribe((dados) => {
      // ACESSAMOS O PRIMEIRO OBSERVABLE COM O .SUBSCRIBE
      dados.then((obs$) => {
        //AQUI ACESSAMOS A PROMISE QUE ESTA DENTRO DO OBSERVABLE - "DADOS"
        obs$.subscribe((func) => {
          //AQUI ACESSAMOS O OBSERVABLE QUE ESTA DENTRO DA PROMISE QUE ESTA DENTRO DO OBSERVABLE - "FUNC" E CONSEGUIMOS ACESSAR O FUNCIONARIO
          this.snackBar.open('Funcionario adicionado com sucesso!', 'Ok', {
            duration: 3000,
          });
          this.dialogRef.close();
        });
      });
    });
  }
}
