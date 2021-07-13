import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertaServiceService } from 'src/app/service/alerta-service.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPostagem: number

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alerta: AlertaServiceService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idPostagem = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem)
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=> {
      this.postagem = resp
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPostagem).subscribe(()=> {
      this.alerta.showAlertDanger('Postagem apagada com sucesso')
      this.router.navigate(['/home'])
    })
  }

}
