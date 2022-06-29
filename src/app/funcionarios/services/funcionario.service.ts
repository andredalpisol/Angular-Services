import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  postFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.baseUrl, funcionario);
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
  async uploadImagem(imagem: File): Promise<string> {
    // para randomizarmos o path, vamos utilizar a data de upload para isso, ela traz inclusive milissegundos
    const nomeArquivo = Date.now();
    // função para fazer upload do arquivo para o firebase, 1º parametro é URL e 2º é o arquivo. Definimos ela como await pois vai ser essa função que ira demorar
    const dados = await this.storage.upload(`imagens/${nomeArquivo}`, imagem);
    // .ref representa justamente a referencia do dado salvo no firebase
    const linkDownload = await dados.ref.getDownloadURL(); //retorna um link para acesso da imagem
    return linkDownload;
  }
}
