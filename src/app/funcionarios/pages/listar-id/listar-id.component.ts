import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-listar-id',
  templateUrl: './listar-id.component.html',
  styleUrls: ['./listar-id.component.scss'],
})
export class ListarIDComponent implements OnInit {
  funcionario!: Funcionario;

  constructor(
    private route: ActivatedRoute, // ACESSAR PARAMETROS DA ROTA QUE ESTÁ ATIVA
    private FuncService: FuncionarioService
  ) {}

  ngOnInit(): void {
    // AQUI TRABALHA COMO OBSERVABLE, SEMPRE QUE ACONTECER UMA ALTERAÇÃO NA FONTE DE DADOS (PARAMETRO PASSADO- ID), O ID NOVO SERÁ INFORMADO
    this.route.paramMap.subscribe((params) => {
      let idFuncionario = parseInt(params.get(`idFuncionario`) ?? '0'); // O ?? É OPERADOR DE coalescing null, SE FOR NULO VAI DEFINIR '0' COMO PADRÃO
      this.recuperarFuncionario(idFuncionario);
      console.log(this.funcionario);
    });

    /*  this.route.snapshot.paraMap.get('idFuncionario') AQUI O SNAPSHOT SALVA UMA UNICA PAGINA COMO CONSTANTE; */
  }

  recuperarFuncionario(id: number): void {
    this.FuncService.getFuncionarioById(id).subscribe((next) => {
      this.funcionario = next;
    });
  }
}
