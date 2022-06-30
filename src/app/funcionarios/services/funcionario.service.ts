import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // importação do FireStorage

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private readonly baseUrl: string = 'http://localhost:3000/funcionarios';

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage // objeto responsavel por salvar as imagens do firebase
  ) {}

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.baseUrl);
  }

  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`);
  }

  /*   postFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.baseUrl, funcionario);
  } */

  /*RXJS Operators: São funções que manipulam os dados retornados pelos observables */
  salvarFuncionario(funcionario: Funcionario, foto: File): Observable<Promise<Observable<Funcionario>>>  {
    return (
      this.http
        .post<Funcionario>(this.baseUrl, funcionario)
        /* A função pipe é utilizada para colocar os operadores do RXJS que manipularão os dados retornados pelos observables */
        .pipe(
          map(async (x) => {
            // fazer upload da imagem e recuperar o link gerado
            const linkFotoFirebase = await this.uploadImagem(foto);
            // atribuir o link gerado ao funcionario criado
            x.foto = linkFotoFirebase;
            // atualizar funcionario com a foto
            return this.putFuncionario(x);
          })
        )
    );
  }

  putFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(
      `${this.baseUrl}/${funcionario.id}`,
      funcionario
    );
  }

  // 1º Vamos pegar a imagem
  // 2º Vamos fazer o upload da imagem
  // 3º Vamos gerar o link de download e retorna-lo

  // Pela função em si pode demorar para executar, vamos defini-la como assincrona, e como retorno iremos receber uma Promise.
  private async uploadImagem(imagem: File): Promise<string> {
    // para randomizarmos o path, vamos utilizar a data de upload para isso, ela traz inclusive milissegundos
    const nomeArquivo = Date.now();
    // função para fazer upload do arquivo para o firebase, 1º parametro é URL e 2º é o arquivo. Definimos ela como await pois vai ser essa função que ira demorar
    const dados = await this.storage.upload(`imagens/${nomeArquivo}`, imagem);
    // .ref representa justamente a referencia do dado salvo no firebase
    const linkDownload = await dados.ref.getDownloadURL(); //retorna um link para acesso da imagem
    return linkDownload;
  }
}
