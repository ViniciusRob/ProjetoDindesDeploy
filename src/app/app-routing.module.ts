import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { PostagemDeleteComponent } from './delet/postagem-delete/postagem-delete.component';
import { TemaDeleteComponent } from './delet/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { OptionComponent } from './option/option.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SobreComponent } from './sobre/sobre.component';
import { TemasComponent } from './temas/temas.component';
import { VagasComponent } from './vagas/vagas.component';

const routes: Routes = [
  {path: '', redirectTo: 'entrar', pathMatch: 'full'},
  {path: 'entrar', component: EntrarComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'option', component: OptionComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'tema-edit/:id', component: TemaEditComponent},
  {path: 'tema-delet/:id', component: TemaDeleteComponent},
  {path: 'postagem-delet/:id', component: PostagemDeleteComponent},
  {path: 'postagem-edit/:id', component: PostagemEditComponent},
  {path: 'usuario-edit/:id', component: UsuarioEditComponent},
  {path: 'temas', component: TemasComponent},
  {path: 'vagas', component: VagasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
