import { Component, OnInit } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';
import { InCharacter, OutCharacter } from '../../models/CharacterE.model';
import { EMPTY, Observable, isEmpty } from 'rxjs';
import { TecladoComponent } from '../teclado/teclado.component';
import { ComponentsService } from '../../services/components.service';
import { wordModel } from '../../models/Words.model';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CeldaComponent,TecladoComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.sass'
})
export class TableroComponent implements OnInit {

  
  Palabras: wordModel[] = []

  constructor(service: ComponentsService){
    service.getWords().subscribe( (data) =>{
      if (!data) {
        return 
      }
      this.Palabras = data.filter(data => data.length === 5 && !data.isAccent)
    })
  }

  characters = this.vacio()
  palabra: string = "" // LA PALABRA ALEATORIA ESCOGIDA
  WordArray: string[] = [] // LA PALABRA ANTERIOR DECOMPUESTA EN UN ARRAY, PARA FINES PRACTICOS
  caractersDeHijo: OutCharacter[] = [] // CAPTURA LOS CARACTERES PROVENIENTES DEL HIJO
  error: String = "" // MOSTRAR AL USUARIO, SI ALGUN CAMPO ESTA INCORRECTO O LA PALABRA NO EXISTEE
  filaActual = 1; // FILA 



  ngOnInit() {
      this.palabra =  this.wordCurrent(this.Palabras.map((elem) => elem.word)).toUpperCase()
      this.WordArray = this.palabra.trim().split("")

  }

  vacio(): InCharacter[] { //// genera un array del objeto InCharacter, que despues se pasan las caracteristicas a la celda. Donde en princio los caracteres estan vacios

    let lista: InCharacter[] = [];

    for (let i = 0; i < 30; i++) {
      let estado = !(i < 5)
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
  

  wordCurrent(arr: string[]) {/// donde se decubre que palabra que se usara
    let size = arr.length
    let position = Math.floor(Math.random() * size)

    return arr[position]
  }

  verificar() {
    this.error = ""
    let WordIdUser = this.caractersDeHijo.filter(elem => { //palabra ordenada, pero con id de la posicion
      if (elem.character.trim().length === 0) {
        return false
      }
      return true
    })
      .sort((a, b) => {
        if (a.id > b.id) {
          return 1
        }
        if (a.id < b.id) {
          return -1
        }
        return 0
      })
    let WordUser = WordIdUser.map(el => el.character) //solo muestra los caracteres
    let palabraRecostruida = WordUser.join("").toUpperCase()
      let listPalabras = this.Palabras.map(elem => elem.word)


    if (!listPalabras.includes(palabraRecostruida.toLowerCase())) {
      this.error = "la palabra no existe en registro"
      return
    }
    if (WordUser.length === 5) {
      if (palabraRecostruida === this.palabra.toLocaleUpperCase()) {
        this.caractersDeHijo.forEach(elem => {
          this.characters[this.characters.findIndex(el => el.id === elem.id)]
            .eventchar = "CORRECT-WORD" // "VOID-WORD", "INCORRECT-WORD", "YELLOW-WORD", "CORRECT-WORD" 
        })
        this.error = "ganaste"
        return
      } else {
        let Copia = [...this.WordArray]

        WordIdUser.forEach((elem, i) => {
          if (elem.character === this.WordArray[i]) {
            this.characters[this.characters.findIndex(el => el.id === elem.id)]
              .eventchar = "CORRECT-WORD";
            Copia[i] = ""
          }
        })
        WordIdUser.forEach((elem, i) => {

          if (this.WordArray.includes(elem.character) && Copia.includes(elem.character)) {
            this.characters[this.characters.findIndex(el => el.id === elem.id)]
              .eventchar = "YELLOW-WORD";
            Copia.shift()
          } else if (!(elem.character === this.WordArray[i])) {
            this.characters[this.characters.findIndex(el => el.id === elem.id)]
              .eventchar = "INCORRECT-WORD";
          }
        })
        this.filaActual++;
      }
      this.filasHabiles(this.filaActual);
      this.caractersDeHijo = []
      console.log();
    }
    else {
      this.error = "Hay espacios vacios";
    }



  }

  filasHabiles(fila: number) { //habilita las fila que se esta usando en el momento, y deshabilita las que no.
    let columnaIncial = (fila * 5) - 5;
    let columnaFinal = (fila * 5)
    for (let i = 0; i < this.characters.length; i++) {
      const el = this.characters[i];

      if (columnaIncial <= i && i < columnaFinal) {
        el.state = false
      } else {
        el.state = true
      }
    }
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


