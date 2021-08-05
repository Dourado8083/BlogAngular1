import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }
  /*Token que colocava no header */
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  /*array*/
  getAllTema(): Observable<Tema[]> {/*verificando o endpoint no temacontroller,necessita do token*/
    return this.http.get<Tema[]>('http://localhost:8081/tema', this.token)
  }
  getByIdTema(id: Number): Observable<Tema> {
    return this.http.get<Tema>(`http://localhost:8081/tema/${id}`, this.token)
  }
  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('http://localhost:8081/tema', tema, this.token)
  }
  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>('http://localhost:8081/tema', tema, this.token)
  }
  deleteTema(id: number) {
    /*essa crase serve para pegar a passagem de parametro que foi feita lá no temacontroller,parametro por rota*/
    return this.http.delete(`http://localhost:8081/tema/${id}`, this.token)
  }
}
