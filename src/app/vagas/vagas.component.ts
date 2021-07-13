import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.css']
})
export class VagasComponent implements OnInit {

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findAllPostagem();
  }
  nomeTema: string
  tema: Tema = new Tema()
  listaTemas: Tema[]

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]

  findAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) =>{
      this.listaPostagem = resp
    })
  }

}
