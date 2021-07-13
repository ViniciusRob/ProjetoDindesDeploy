import { Postagem } from "./Postagem"

export class Tema{
    public id: number
    public nomeTema: string
    public area: string
    public descricao: string
    public qtdTema: number
    public postagem: Postagem[]
}