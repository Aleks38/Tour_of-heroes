import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-caracteristique-form',
  templateUrl: './caracteristique-form.component.html',
  styleUrls: ['./caracteristique-form.component.css']
})
export class CaracteristiqueFormComponent {
  caracteristiqueForm = new FormGroup({
    attaque: new FormControl('', Validators.min(0)),
    degats: new FormControl(20,),
    esquive: new FormControl(''),
    pv: new FormControl(''),
  });
}
