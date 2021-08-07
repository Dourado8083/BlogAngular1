import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
tema:Tema = new Tema()
postagem:Postagem = new Postagem()
listaTemas: Tema[]
idTema:number
user:User = new User()
idUser = environment.id
  constructor(
    private router:Router,
    private postageService:PostagemService,
    private temaService:TemaService
    /*injetado o service de tema para pegar os temas */
  ) { }

  ngOnInit(){
  if(environment.token == ''){
    /*verifica se o token esta vazio
    alert('Sua Sessão expirou,faça o login novamente.') */
    this.router.navigate(['/entrar'])
  }
  this.getAllTemas()
  }
  getAllTemas(){
  this.temaService.getAllTema().subscribe((resp: Tema[])=>{
   this.listaTemas = resp
  })
  }
  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp:Tema)=>{
    this.tema = resp
    })
  }
publicar(){
this.tema.id = this.idTema
this.postagem.tema = this.tema
/*pegou o usuário certo na this.idUser e depois passou para postagem */
this.user.id = this.idUser
this.postagem.usuario = this.user
this.postageService.postPostagem(this.postagem).subscribe((resp:Postagem)=>{
this.postagem = resp
alert('Postagem realizada co sucesso!')
this.postagem = new Postagem() /*limpeza de campo */
})
}
}
