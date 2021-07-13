import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertaServiceService } from 'src/app/service/alerta-service.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alerta: AlertaServiceService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=> {
      this.tema = resp
    })
  }

  apagar(){
    this.temaService.deleteTema(this.idTema).subscribe(()=> {
      this.alerta.showAlertDanger('Tema apagado com sucesso')
      this.router.navigate(['/home'])
    })
  }

}
