import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-caracteristique-form',
  templateUrl: './caracteristique-form.component.html',
  styleUrls: ['./caracteristique-form.component.css']
})
export class CaracteristiqueFormComponent {
  caracteristiqueForm = new FormGroup({
    attaque: new FormControl(''),
    degats: new FormControl(''),
    esquive: new FormControl(''),
    pv: new FormControl(''),
  });
}
