import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertaServiceService } from 'src/app/service/alerta-service.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertaServiceService,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.temaService.refreshToken
    this.findByIdTema(id)

  }

  findAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) =>{
      this.listaPostagem = resp
    })
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=> {
      this.tema = resp
    })
  }

  atualizar(){
    this.tema.postagem = this.listaPostagem

    this.temaService.putTema(this.tema).subscribe((resp: Tema)=> { 
      this.tema = resp
      this.alertas.showAlertSuccess('Tema atualizado com sucesso')
      this.router.navigate(['/home'])
    })
  }

}
