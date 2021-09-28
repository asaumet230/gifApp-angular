import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root' //Esto eleva el servicio a nivel global
})
export class GifsService {

  private servicioURL : string = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = 'UynxGpJYZvQFsWy9wIKMcfpTfKcxB35t';
  private _historial: string[]=[];
  public resultados: Gif[]=[];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(busqueda: string){

    busqueda = busqueda.trim().toLowerCase();

    if(!this._historial.includes(busqueda)){ //Verificas que el valor no este para agregarlo

      this._historial.unshift(busqueda); //Agregas el valor de primero

       this._historial = this._historial.splice(0,10); //Cortas el arreglo para que sean 10 busquedas

       localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams() //Automatizas los parametros de la busqueda.
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', busqueda);

    console.log(this._historial);

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
      .subscribe((respuesta: any) => {
        this.resultados = respuesta.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
        console.log(this.resultados);
      });
  }

  borrarGifs(){
    this._historial.pop();
    this.resultados = []
    localStorage.setItem('historial', JSON.stringify(this._historial));
    localStorage.setItem('resultados', JSON.stringify(this.resultados));
    
  }

  borrarTodo(){
    this._historial = [];
    this.resultados = []
    localStorage.setItem('historial', JSON.stringify(this._historial));
    localStorage.setItem('resultados', JSON.stringify(this.resultados));
    
  }
}
