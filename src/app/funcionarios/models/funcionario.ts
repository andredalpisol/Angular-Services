export interface Funcionario {
  id?: number; // "?" serve para que o campo não seja obrigatorio na criação de algo implementando a inferafe
  nome: string;
  email: string;
  foto: string;
}
