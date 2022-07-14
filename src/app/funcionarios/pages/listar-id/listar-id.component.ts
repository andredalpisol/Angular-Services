import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { ConfirmDialogComponent } from '../Dialogues/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listar-id',
  templateUrl: './listar-id.component.html',
  styleUrls: ['./listar-id.component.scss'],
})
export class ListarIDComponent implements OnInit {
  funcionario!: Funcionario;

  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    foto: [''],
  });

  imagePreview: string = '';
  foto!: File; // undefined
  desabilitar: boolean = true;
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute, // acessar os parâmetros da rota ativa
    private funcService: FuncionarioService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // let idFuncionario = this.route.snapshot.paramMap.get('idFuncionario')
    this.route.paramMap.subscribe((params) => {
      let idFuncionario = parseInt(params.get('idFuncionario') ?? '0');
      this.recuperarFuncionario(idFuncionario);
    });
  }

  recuperarFuncionario(id: number): void {
    this.funcService.getFuncionarioById(id).subscribe(
      (func) => {
        this.funcionario = func;

        this.formFuncionario.setValue({
          nome: this.funcionario.nome,
          email: this.funcionario.email,
          foto: '',
        });

        this.imagePreview = this.funcionario.foto;

        this.valorMudou();
      },
      (erro: HttpErrorResponse) => {
        this.notFound = erro.status == 404;
      }
      /*  this.notFound = erro.statusText == 'Not Found'; */
    );
  }

  recuperarFoto(event: any): void {
    this.foto = event.target.files[0];

    const reader = new FileReader(); // objeto do js que faz leitura de arquivos

    reader.readAsDataURL(this.foto); // ler o arquivo e gerar um link local para o acesso do conteúdo daquele arquivo

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  }

  alterar(): void {
    this.desabilitar = true;

    const f: Funcionario = { ... this.formFuncionario.value } // AQUI ESTAMOS UTILIZANDO O DESTRUCTIVE -> DESTRUINDO O OBJETO E COLOCANDO ELE EM PROPRIEDADES SEPARADAS

    f.id = this.funcionario.id;
    f.foto = this.funcionario.foto;

    if (this.formFuncionario.value.foto.length > 0) {
      this.funcService.putFuncionario(f, this.foto).subscribe(async (dados) => {
        await dados.then((obs$: any) => {
          obs$.subscribe((func: any) => {
            this.snack.open('Dados do funcionario alterados com sucesso', 'Ok', {
              duration: 3000,
            })
            this.recuperarFuncionario(f.id!);

          });
        });
      })
    }
    this.funcService.putFuncionario(f).subscribe((dados) => {
      this.recuperarFuncionario(f.id!);
      this.router.navigateByUrl(`http://localhost:4200/funcionarios/${f.id}`)

    })
  }

  deletar(func: Funcionario) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((boolean) => {
      if (boolean) {
        this.funcService.deleteFuncionario(func).subscribe(
          (next) => {
            this.snack.open('Funcionario deletado com sucesso!', 'Ok', {
              duration: 3000,
            }
            )

            this.router.navigateByUrl('/funcionarios')
          },
          (error) => {
            this.snack.open('Erro ao deletar o funcionario', 'Ok', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    })
  }



  valorMudou() {
    /**
     * valueChanges é uma propriedade dos FormGroups
     * que é um observable que quando um valor do seu formulário
     * altera, esse observable te retorna essa modificação
     */
    this.formFuncionario.valueChanges.subscribe(
      /**
       * o parâmetro valores é um objeto que é retornado te informando
       * o valor de cada campo do seu reative forms
       */
      (valores) => {
        /**
         * o botão será desabilitado se as validações do formulário estiverem inválidas
         * ou se o valor de algum campo do formulário estiver diferente do valor de alguma
         * propriedade do objeto funcionário
         */
        this.desabilitar =
          this.formFuncionario.invalid ||
          !(
            valores.nome != this.funcionario.nome ||
            valores.email != this.funcionario.email ||
            valores.foto.length > 0
          );
      }
    );
  }
}
