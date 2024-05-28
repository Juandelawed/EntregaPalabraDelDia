import { Component, OnInit } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';
import { InCharacter, OutCharacter } from '../../models/CharacterE.model';
import { TecladoComponent } from '../teclado/teclado.component';
import { ComponentsService } from '../../services/components.service';
import { difficultyType, wordModel } from '../../models/Words.model';
import { PalabrasComponent } from '../palabras/palabras.component';
import { AsyncPipe } from '@angular/common';
import { InicioComponent } from '../inicio/inicio.component';
import { Observable, delay } from 'rxjs';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CeldaComponent,TecladoComponent,PalabrasComponent, InicioComponent, AsyncPipe],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.sass'
})
export class TableroComponent implements OnInit {

  public Palabras$!: Observable<wordModel[]>

  constructor( private service: ComponentsService){
    // service.getWords().subscribe( (data) =>{
    //   if (!data) {
    //     return 
    //   }
    //   this.Palabras = data.filter(data => data.length === 5 && !data.isAccent)
    // })
  }

  characters = this.vacio(5)
  palabra: string = "" // LA PALABRA ALEATORIA ESCOGIDA
  //WordArray: string[] = [] // LA PALABRA ANTERIOR DECOMPUESTA EN UN ARRAY, PARA FINES PRACTICOS
  caractersDeHijo: OutCharacter[] = [] // CAPTURA LOS CARACTERES PROVENIENTES DEL HIJO
  error: string = "" // MOSTRAR AL USUARIO, SI ALGUN CAMPO ESTA INCORRECTO O LA PALABRA NO EXISTEE


  ngOnInit() {
      this.Palabras$ = this.service.getWords();
      this.Palabras$.subscribe(elem => {
        this.palabra = this.wordCurrent(elem.filter(elem =>  elem.length === 5).map(elem => elem.word))
      })
      // this.WordArray = this.palabra.trim().split("")

  }

  vacio(size: number): InCharacter[] { //// genera un array del objeto InCharacter, que despues se pasan las caracteristicas a la celda. Donde en princio los caracteres estan vacios

    let lista: InCharacter[] = [];

    for (let i = 0; i < size*6 ; i++) {
      let estado = !(i < size)
      lista.push({
        id: i,
        character: "",
        state: estado,
        focus: i === 0,
        eventchar: "VOID-WORD" // "VOID-WORD", "INCORRECT-WORD", "YELLOW-WORD", "CORRECT-WORD"
      })

    }
    return lista
  }

  SelectDiff( Diff: difficultyType ){

    this.Palabras$.subscribe((words) =>{
      this.palabra = this.wordCurrent(words.filter(elem => {
        return elem.difficulty === Diff && !elem.isAccent
    }).map(elem => elem.word ))
      console.log(this.palabra)
      this.characters = this.vacio(this.palabra.length)
    })
    

  }


  wordCurrent(arr: string[]) {/// donde se decubre que palabra que se usara
    let size = arr.length
    let position = Math.floor(Math.random() * size)

    return arr[position]
  }


  CaracterEntrante(msgEntrante: OutCharacter) {
    let encontrar = this.caractersDeHijo.find((el) => el.id === msgEntrante.id)


    if (!encontrar && this.caractersDeHijo.length < 5) {
      this.caractersDeHijo.push(msgEntrante)
    } else {
      let index = this.caractersDeHijo.findIndex((el) => el.id === msgEntrante.id)
      let copia = [...this.caractersDeHijo]
      copia[index] = { ...copia[index], id: msgEntrante.id, character: msgEntrante.character }

      this.caractersDeHijo = copia
    }

  }
}


