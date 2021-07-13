import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  nomeTema: string
  tema: Tema = new Tema()
  listaTemas: Tema[]

  portagem: Postagem = new Postagem()
  listaPostagem: Postagem[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.findAllPostagem()
    this.postagemService.refreshToken
    this.temaService.refreshToken

  }

  findAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) =>{
      this.listaPostagem = resp
    })
  }


  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByNomeTema(){
    if(this.nomeTema == ''){
      this.getAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

}
