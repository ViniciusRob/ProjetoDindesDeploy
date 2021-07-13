import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AlertaServiceService } from '../service/alerta-service.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User();
  confirmarSenha: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alerta: AlertaServiceService
  ) { }

  ngOnInit(){
    window.scroll(0, 0);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  cadastrar() {

    this.user.tipo = environment.tipo

    if (this.user.senha != this.confirmarSenha) {

      this.alerta.showAlertDanger('As senhas estão incorretas');
      
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alerta.showAlertSuccess('Usuario Cadastrado com sucesso!')
      });

    }
  }

}
