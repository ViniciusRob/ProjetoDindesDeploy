import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-apadrinhade',
  templateUrl: './apadrinhade.component.html',
  styleUrls: ['./apadrinhade.component.css']
})
export class ApadrinhadeComponent implements OnInit {

  user: User = new User
  listaUser: User[]

  idUser = environment.id

  postagem = new Postagem()
  listaPostagens: Postagem[]

  key = 'data';
  reverse = true;


  constructor(
    private router: Router,
    private auth: AuthService,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findByIdUser()
    this.getAllPostagens()
    this.getAlUser()
  }

  findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: User) =>{
      this.user = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  getAlUser(){
    this.auth.getAllUser().subscribe((resp: User[])=>{
      this.listaUser = resp;
    })
  }


}
