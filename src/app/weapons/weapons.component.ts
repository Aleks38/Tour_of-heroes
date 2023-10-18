import {Component} from '@angular/core';
import {Weapon} from "../weapon";
import {WeaponService} from "../weapon.service";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent {
  weapons: Weapon[] = [];

  constructor(private weaponService: WeaponService) {
  }

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }


}
