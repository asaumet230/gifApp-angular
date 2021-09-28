import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  /*=== Esta es otra forma de trabajar con ViewChild la otra es con NgModule ===*/

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  //Este decorador busca elementos del HTML a traves de 
  //Una referencia.

  public mensaje: string= '';

  constructor(private gifsService: GifsService){}

  buscar(){

    const valor = this.txtBuscar.nativeElement.value; //Atrapar Valor

    if(valor.trim()=== ''){
      this.mensaje='Debes ingresar valor para realizar la busqueda...';
      setTimeout(() => {
      this.mensaje = '';
    }, 3000);
      return;
    }

    this.gifsService.buscarGifs(valor); //Insertar Valor
    
    this.txtBuscar.nativeElement.value = ''; //Reiniciar Input

   
  }

  
}
