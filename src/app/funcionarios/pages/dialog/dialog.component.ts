import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<DialogComponent> //objeto que permite controlar o dialog aberto
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

  //codigo do renato para fazer funçção put
  salvar(): void {
    const f: Funcionario = this.funcionarioForm.value;
    f.foto = '';

    this.funcService.postFuncionario(f).subscribe(async (func) => {
      // após salvar os dados basicos do funcionarios recebidos pelo form vamos salvar a imagem e gerar o link dela
      const link = await this.funcService.uploadImagem(this.foto);
      func.foto = link;
      this.funcService.putFuncionario(func).subscribe((next) => {
        alert('Funcionario salvo com sucesso');
        this.dialogRef.close(); // função para fechar o dialog
      });
    });
  }
}
