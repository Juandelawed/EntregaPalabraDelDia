import { Component, output } from '@angular/core';
import { difficultyType } from '../../models/Words.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.sass'
})
export class InicioComponent {

  outSelectDiff = output<difficultyType>()

  ModalState = "block"
  Difficulties: difficultyType[] = ["easy", "medium", "hard"]

  closeSelect(){
    this.ModalState = "none"
  }
  selectDiff( dificultad:difficultyType ){
    this.outSelectDiff.emit(dificultad)
    this.closeSelect()
  }
  
}
