import { Component, OnInit } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';
import { InCharacter, OutCharacter } from '../../models/CharacterE.model';
import { EMPTY, isEmpty } from 'rxjs';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CeldaComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.sass'
})
export class TableroComponent implements OnInit {
  Palabras = [
    "perro",
    "uribe",
    "linea",
    "kevin",
    "david",
    "arbol",
    "sushi"
  ]

  characters = this.vacio()
  palabra: string = ""
  WordArray: string[] = []
  caractersDeHijo: OutCharacter[] = []
  error:String = ""
  filaActual = 1;
  


  ngOnInit(): void {
    this.palabra = this.wordCurrent(this.Palabras).toUpperCase()
    this.WordArray = this.palabra.split("")

  }

  vacio(): InCharacter[] {
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

  wordCurrent(arr: string[]) {
    let size = arr.length
    let position = Math.floor(Math.random() * size)

    return arr[position]
  }

  verificar() {
    let WordIdUser = this.caractersDeHijo.filter( elem => { //palabra ordenada, pero con id de la posicion
      if(elem.character.trim().length === 0){
        return false
      }
      return true
    })
    .sort((a, b) => {
      if(a.id > b.id){
        return 1
      }
      if(a.id < b.id){
        return -1
      }
      return 0
    })
    let WordUser = WordIdUser.map(el => el.character) //solo muestra los caracteres

    if(WordUser.length === 5){
      let palabraRecostruida = WordUser.join("").toUpperCase()

      if (palabraRecostruida === this.palabra.toLocaleUpperCase()) {
        this.caractersDeHijo.forEach(elem =>{
          this.characters[this.characters.findIndex(el => el.id === elem.id)]
          .eventchar =  "CORRECT-WORD" // "VOID-WORD", "INCORRECT-WORD", "YELLOW-WORD", "CORRECT-WORD" 
        })
        this.error = "ganaste"
        return
      }else{
          WordIdUser.forEach((elem, i) => {
          if(elem.character === this.WordArray[i]){
            this.characters[this.characters.findIndex(el => el.id === elem.id)]
            .eventchar = "CORRECT-WORD";

          }else if(this.WordArray.includes(elem.character)){
            this.characters[this.characters.findIndex(el => el.id === elem.id)]
            .eventchar = "YELLOW-WORD";
          }else{
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
    else{
      this.error = "Hay espacios vacios";
    }
    


  }


  filasHabiles(fila:number){
    let columnaIncial = (fila * 5) - 5 ;
    let columnaFinal = (fila * 5) 
    for (let i = 0 ; i < this.characters.length ; i++) {
      const el = this.characters[i];

      if (columnaIncial <= i && i < columnaFinal) {
        el.state = false
      }else{
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
        copia[index] = {...copia[index], id: msgEntrante.id, character: msgEntrante.character }

        this.caractersDeHijo = copia
      }

    } 
}


