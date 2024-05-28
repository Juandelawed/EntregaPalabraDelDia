import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teclado',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './teclado.component.html',
  styleUrl: './teclado.component.sass'
})
export class TecladoComponent implements OnInit {

  ngOnInit(): void {
      
  }

}
