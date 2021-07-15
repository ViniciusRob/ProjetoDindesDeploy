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
  userArea: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alerta: AlertaServiceService
  ) { }

  // função de início

  ngOnInit(){
    window.scroll(0, 0);
  }

  // função de confirma senha 

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  area(event: any){
    this.userArea = event.target.value;
  }

  // função de cadastro

  cadastrar() {

    this.user.tipo = environment.tipo
    this.user.area = this.userArea

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

  // funções de validação

  // validaNome(){

  //   let nome = document.querySelector("#nome1");

  //   let nomeValue = (<HTMLInputElement>document.querySelector("#nome1")).value.length;
    
  //   if(nomeValue < 5){
  //     nome.setAttribute('style', 'border-color: #9794F2');
  //   } else {
  //     nome.setAttribute('style', 'border-color:#e84c3d');
  //   }
  // }


}
