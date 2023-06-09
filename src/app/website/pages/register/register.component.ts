import { Component } from '@angular/core';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  onExit(): boolean {
    const rta = confirm('¿Estás seguro de que quieres salir?');
    return rta;
  }
}
