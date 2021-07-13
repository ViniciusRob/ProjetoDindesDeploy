import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AlertaServiceService } from '../service/alerta-service.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dinde-option',
  templateUrl: './dinde-option.component.html',
  styleUrls: ['./dinde-option.component.css']
})
export class DindeOptionComponent implements OnInit {

  user: User = new User()
  dinde: User = new User()
  listaUser: User[]
  idDinde: number

  id = environment.id

  confirmarSenha: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private alertas: AlertaServiceService
  ) { }

  ngOnInit(){
    window.scroll(0, 0);

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.id = environment.id
    this.findAllUser()
    this.findByIdApadrinhade(this.id)
  }

  findAllUser(){
    this.auth.getAllUser().subscribe((resp: User[]) =>{
      this.listaUser = resp
    })
  }

  findByIdApadrinhade(id: number){
    this.auth.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  findByIdDinde(id: number){
    this.auth.getByIdUser(id).subscribe((resp: User) => {
      this.dinde = resp
    })
  }

  dindeId(event: any){
    this.idDinde = event.target.value
    this.findByIdDinde(this.idDinde)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  alterarUser(){
    console.log(this.user)
    console.log(this.dinde)

    this.dinde.id = this.idDinde
    this.user.dinde = this.dinde


    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas não coincidem');
    } else {
      this.auth.putUsuario(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.alertas.showAlertSuccess('Dinde registrado com sucesso. Faça o login novamente');
        environment.token = '';
        environment.foto = '';
        environment.id = 0;
        environment.nome = '';
        console.log(this.dinde)
        this.router.navigate(['/entrar']);
      });
    }
  }

}
