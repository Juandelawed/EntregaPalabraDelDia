import { Component, effect, input, model, output } from '@angular/core';
import { InCharacter, OutCharacter } from '../../models/CharacterE.model';
import { wordModel } from '../../models/Words.model';


@Component({
  selector: 'app-palabras',
  standalone: true,
  imports: [],
  templateUrl: './palabras.component.html',
  styleUrl: './palabras.component.sass'
})

export class PalabrasComponent {

  arrFilaWrite = model<OutCharacter[]>([]) //La fila actual escrita por el usuario o 
  Palabras = input<wordModel[]>([])
  palabra = input("")

  btn = output<boolean>()

  btnVerificar = model<boolean>()
  characters = model<InCharacter[]>([])
  Mensaje = model("")

  WordArray: string[] = []
  filaActual = 1; // FILA 
  constructor() {
    // effect(()=>{
    //   if (this.btnVerificar()) {
    //     this.verificar()

    //    }
    // })
  }


  verificar() {
    this.WordArray = this.palabra().trim().toUpperCase().split("")

    console.log(this.palabra().length)
    this.Mensaje.set("")
    let WordIdUser = this.arrFilaWrite().filter(elem => { //palabra ordenada, pero con id de la posicion
      if (elem.character.trim().length === 0) {
        return false
      }
      return true
    }).sort((a, b) => {
        if (a.id > b.id) {
          return 1
        }
        if (a.id < b.id) {
          return -1
        }
        return 0
      })
    console.log(WordIdUser)
    let WordUser = WordIdUser.map(el => el.character) //solo muestra los caracteres
    let palabraRecostruida = WordUser.join("").toUpperCase()
    let listPalabras = this.Palabras().map(elem => elem.word.toUpperCase())


    
    if (WordUser.length === this.palabra().length) {

      if (!listPalabras.includes(palabraRecostruida.toUpperCase())) {
        this.Mensaje.set("la palabra no existe en registro")
        return
      }

      if (palabraRecostruida === this.palabra().toUpperCase()) {
        this.arrFilaWrite().forEach(elem => {
          this.characters()[this.characters().findIndex(el => el.id === elem.id)]
            .eventchar = "CORRECT-WORD" // "VOID-WORD", "INCORRECT-WORD", "YELLOW-WORD", "CORRECT-WORD" 
        })
        this.Mensaje.set("ganaste")
        return
      } else {  
        let Copia = [...this.WordArray]

        WordIdUser.forEach((elem, i) => {
          if (elem.character === this.WordArray[i]) {
            this.characters()[this.characters().findIndex(el => el.id === elem.id)]
              .eventchar = "CORRECT-WORD";
            Copia[i] = ""
          }
        })
        WordIdUser.forEach((elem, i) => {

          if (this.WordArray.includes(elem.character) && Copia.includes(elem.character) && !(elem.character === this.WordArray[i]))  {
            this.characters()[this.characters().findIndex(el => el.id === elem.id)]
              .eventchar = "YELLOW-WORD";
            Copia.shift()
          } else if (!(elem.character === this.WordArray[i])) {
            this.characters()[this.characters().findIndex(el => el.id === elem.id)]
              .eventchar = "INCORRECT-WORD";
          }
        })
        this.filaActual++;
      }
      this.filasHabiles(this.filaActual);
      this.arrFilaWrite.set([])
      console.log(this.arrFilaWrite());
    }
    else {
      this.Mensaje.set("Hay espacios vacios");
    }
    this.btn.emit(false)

  }

  filasHabiles(fila: number) { //habilita las fila que se esta usando en el momento, y deshabilita las que no.
    let columnaIncial = (fila * 5) - 5;
    let columnaFinal = (fila * 5)
    for (let i = 0; i < this.characters().length; i++) {
      const el = this.characters()[i];

      if (columnaIncial <= i && i < columnaFinal) {
        el.state = false
      } else {
        el.state = true
      }
    }
  }


}
