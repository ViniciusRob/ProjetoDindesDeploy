import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  user: User = new User();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  dinde(){
    environment.tipo = "dinde"

    this.router.navigate(['/cadastrar'])
  }

  apadrinhade(){
    environment.tipo = "apadrinhade"
    this.router.navigate(['/cadastrar'])
  }




}
