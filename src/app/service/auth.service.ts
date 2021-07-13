import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token= {
      headers: new HttpHeaders().set('Authorization', environment.token) 
    }
  }

  getAllUser(): Observable<User[]>{
    return this.http.get<User[]>('https://dindes.herokuapp.com/usuarios/all')
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://dindes.herokuapp.com/usuarios/${id}`)
  }

  putUsuario(user: User): Observable<User>{
    return this.http.put<User>('https://dindes.herokuapp.com/usuarios/alterar', user)
  }

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://dindes.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>('https://dindes.herokuapp.com/usuarios/cadastrar', user)
  }

  logado(){
    let ok: boolean  = false

    if(environment.token != ''){
      ok = true
    }
    
    return ok
  }

  dinde(){
    let ok = false

    if(environment.tipo == 'dinde'){
      ok = true
    }

    return ok

  }

  apadrinhade(){
    let ok = false

    if(environment.tipo == 'apadrinhade'){
      ok = true
    }

    return ok

  }


}