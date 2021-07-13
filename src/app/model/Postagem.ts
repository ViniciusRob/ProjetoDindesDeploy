import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem{
    public id: number
    public texto: string
    public curtida: number
    public midia: string
    public vaga: boolean
    public tituloVaga: string
    public data: Date
    public tema: Tema
    public usuario: User
}