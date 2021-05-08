import { Autor } from "../autores/autor.model";

export class Livro {
    id?: number;
    titulo: string;
    isbn: string;
    numeroPaginas: number;
    autores: string[];
    preco: number;
    logoUrl: string;
}
