import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0, 0);
  }

  entrar(){
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) =>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.area = this.userLogin.area
      environment.id = this.userLogin.id
      environment.usuario = this.userLogin.usuario
      environment.sobre = this.userLogin.sobre
      environment.telefone = this.userLogin.telefone
      environment.email = this.userLogin.email

      this.router.navigate(['/home'])
      
    }, erro => {
      if(erro.status == 500){
        alert('usuario ou senha incorretos')
      }

    })
  }



}
