import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private funcService: FuncionarioService
  ) {}

  funcionarioForm: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  foto!: File;
  fotoPreview!: string;

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

    this.funcService.postFuncionario(f).subscribe((func) => console.log(func));
  }
}
