import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertaServiceService } from '../service/alerta-service.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]

  user: User = new User()
  usuario: User = new User()
  idUser = environment.id
  idUsuario = environment.id


  key = 'data';
  reverse = true;


  foto = environment.foto
  nome = environment.nome
  area = environment.area
 

  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private authService: AuthService,
    private alertaService: AlertaServiceService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == ''){
      this.router.navigate(['/entrar'])

    }

    this.temaService.refreshToken()
    this.postagemService.refreshToken()

    this.findAllTemas()
    this.findAllPostagem()
    this.findByIdUser()
  }

  // metodos de tema

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  cadastrarTema(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema) =>{ 
      this.tema = resp
      this.alertaService.showAlertSuccess('Tema cadastrado com sucesso')
      this.findAllTemas()
      this.tema = new Tema()
    }, erro => {
      if(erro.status == 500){
        this.alertaService.showAlertDanger('Verifique se preencheu todos os campos corretamente.')
      }

    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  findAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) =>{
      this.listaPostagem = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) =>{
      this.user = resp
    })
  }

  tipoPostagem(event: any){
    if(event.target.value=="postagem"){
      let vaga = false;
      this.postagem.vaga = vaga;
    } else if(event.target.value=="vaga"){
      let vaga = true;
      this.postagem.vaga = vaga;
    }
  }

  midia(event: any){
    this.postagem.midia = event.target.value
  }

  cadastrarPostagem(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
  
      this.usuario.id = this.idUsuario
      this.postagem.usuario = this.usuario
  
      this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) =>{
        this.postagem = resp
        this.alertaService.showAlertSuccess('Postagem feita com sucesso!')
        this.findAllPostagem()
        this.postagem = new Postagem()
  
  
      }, erro => {
        if(erro.status == 500){
          this.alertaService.showAlertDanger('Verifique se indicou o tema da postagem e se ela ?? uma vaga ou n??o e tente novamente.')
        }
      })
    }
}
