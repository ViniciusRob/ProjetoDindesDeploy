import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User = new User

  foto = environment.foto
  nome = environment.nome

  idUser = environment.id

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(){
    this.findByIdUser()

  }

  sair(){
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }

  dinde(){

    if(this.user.dinde == null){
      this.router.navigate(['/dinde-option'])
    } else {
      this.router.navigate(['/dinde'])
    }
    
  }

    findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: User) =>{
      this.user = resp
    })
  }
    
  }


