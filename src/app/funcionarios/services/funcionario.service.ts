import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private readonly baseUrl: string = 'http://localhost:3000/funcionarios';

  constructor(private http: HttpClient) {}

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
}
