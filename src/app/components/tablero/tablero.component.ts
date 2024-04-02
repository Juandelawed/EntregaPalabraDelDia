import { Component, OnInit } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';
import { InCharacter, OutCharacter } from '../../models/CharacterE.model';

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
    "arbol"
  ]

  characters = this.vacio()
  palabra: string = ""
  WordArray: string[] = []
  caractersDeHijo: OutCharacter[] = []
  error:String = ""
  


  ngOnInit(): void {
    this.palabra = this.wordCurrent(this.Palabras)
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
    let WordTemp = this.caractersDeHijo.filter( elem => {
      if(elem.character !== "", elem.character !== " "){
        return true
      }
      return false
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
    .map(el => el.character)
    

    if(WordTemp.length === 5){
      let palabraRecostruida = WordTemp.join("").toUpperCase()

      if (palabraRecostruida === this.palabra.toLocaleUpperCase()) {
        this.caractersDeHijo.forEach(elem =>{
          this.characters[this.characters.findIndex(el => el.id === elem.id)]
          .eventchar =  "CORRECT-WORD" // "VOID-WORD", "INCORRECT-WORD", "YELLOW-WORD", "CORRECT-WORD"
          this.error = "ganaste"
        })
      }

      console.log()
    }
    else{
      this.error = "Hay espacios vacios"
    }
    


  }

  compareArrays(arr1:[], arr2:[]){

    let arrIndex:number[] = []
    arr1.forEach((elem, i)=>{
      if (elem === arr2[i]) {
        arrIndex.push(i);
      }
    })
    return arrIndex

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


