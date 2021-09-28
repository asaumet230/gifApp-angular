import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

   get historial(){
   return this.gifsService.historial;
  }
  
  constructor(private gifsService: GifsService) { }

 buscar(termino: string): void{

  this.gifsService.buscarGifs(termino);
 }

 borrarUltimo(){
  this.gifsService.borrarGifs();
 }

 borrarTodo(){
   this.gifsService.borrarTodo();
 }
}
