import { Component, ElementRef, Input, OnInit, booleanAttribute, Renderer2, AfterViewInit, Output, EventEmitter, numberAttribute, output, input } from '@angular/core';
import { OutCharacter } from '../../models/CharacterE.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-celda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './celda.component.html',
  styleUrl: './celda.component.sass'
})
export class CeldaComponent implements OnInit, AfterViewInit {

  @Input({required: true}) caracter!:string
  @Input({transform: booleanAttribute}) focus:boolean = false
  @Input({required: true, transform: booleanAttribute }) state:boolean = false
  @Input({transform: numberAttribute}) id:number = 0
  eventWord = input<string>("VOID-WORD") // "VOID-WORD", "INCORRECT-WORD", "YELLOW-WORD", "CORRECT-WORD"


  // @ViewChild(input) txt!: ElementRef ;
  caracterOut = output<OutCharacter>()
  constructor(){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
  }
 

  OnKey(){
  
    this.caracterOut.emit({
      id:this.id,
      character:this.caracter.toUpperCase()
    })

  }

 
}
