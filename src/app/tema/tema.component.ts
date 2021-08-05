import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema()
  listaTemas: Tema[] /*pegando lá do service */
  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      /*verifica se o token esta vazio
      alert('Sua Sessão expirou,faça o login novamente.') */
      this.router.navigate(['/entrar'])
    }
    this.findAllTemas()/*todas vez que iniciar a pagina tema ,chama o findall*/
  }
  findAllTemas(){
  this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
 this.listaTemas = resp /*array dentro de um array */
  })
  }
  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('O Novo Tema foi cadastrado!')
      this.findAllTemas()/*Puxar o tema depois que foi cadastrado */
      this.tema = new Tema() /*para limpar e poder cadastrar outro tema */
    })
  }
}
