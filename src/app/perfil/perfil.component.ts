
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  foto = environment.foto
  nome = environment.nome
  area = environment.area
  telefone = environment.telefone
  email = environment.email
  sobre = environment.sobre
  usuario = environment.usuario
  id = environment.id
  
  user: User = new User()
  confirmarSenha: string;
  tipoUsuario: string
  idUser: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    // this.idUser = this.user.id
    // this.findByIdUser(this.idUser)

    // console.log(this.user)
  }

  // findByIdUser(id: number){
  //   this.authService.getByIdUser(id).subscribe((resp: User) => {
  //     this.user = resp
  //   })
  // }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  // alterarUser(){
  //   this.user.tipo = environment.tipo
  

  //   if (this.user.senha != this.confirmarSenha) {
  //     alert('As senhas não coincidem');
  //   } else {
  //     this.authService.cadastrar(this.user).subscribe((resp: User) => {
  //       this.user = resp;
  //       alert('Usuário atualizado com sucesso. Faça o login novamente');
  //       environment.token = '';
  //       environment.foto = '';
  //       environment.id = 0;
  //       environment.nome = '';
  //       this.router.navigate(['/entrar']);
  //     });
  //   }
  // }

}
