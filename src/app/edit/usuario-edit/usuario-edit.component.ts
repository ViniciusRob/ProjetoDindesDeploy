import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id'];
    this.findByIdUser(this.idUser);
    console.log(this.user)
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

    if (this.user.senha != this.confirmarSenha) {
      alert('As senhas não coincidem');
    } else {
      this.authService.putUsuario(this.user).subscribe((resp: User) => {
        this.user = resp;
        alert('Usuário atualizado com sucesso. Faça o login novamente');
        environment.token = '';
        environment.foto = '';
        environment.id = 0;
        environment.nome = '';
        console.log(this.user)
        this.router.navigate(['/entrar']);
      });
    }
  }
}
