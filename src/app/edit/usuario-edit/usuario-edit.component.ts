import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { User } from 'src/app/model/User';
import { AlertaServiceService } from 'src/app/service/alerta-service.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  user: User = new User()
  confirmarSenha: string;
  tipoUsuario: string
  idUser: number
  dinde: User

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alertas: AlertaServiceService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id'];
    this.findByIdUser(this.idUser);
    console.log(this.user)
  }

  findAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) =>{
      this.listaPostagem = resp
    })
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  alterarUser(){

    this.user.tipo = environment.tipo

    this.user.dinde = this.dinde

    this.user.postagem = this.listaPostagem

    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas não coincidem');
    } else {
      this.authService.putUsuario(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso. Faça o login novamente');
        environment.token = '';
        environment.foto = '';
        environment.id = 0;
        environment.nome = '';
        console.log(this.user)
        this.router.navigate(['/entrar']);
      }, erro => {
        if(erro.status == 500){
          this.alertas.showAlertDanger('Verifique se preencheu todos os campos corretamente.')
        }
  
      });
    }
  }
}
