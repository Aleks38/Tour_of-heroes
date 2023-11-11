import {Component, OnInit} from '@angular/core';
import {Weapon} from "../weapon";
import {WeaponInterfaceService} from "../weapon-interface.service";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[] = [];
  parametresTri: string[] = ['attaque', 'esquive', 'degats', 'pv'];
  selectedParametreTri?: string;

  constructor(private weaponInterfaceService: WeaponInterfaceService) {
  }

  ngOnInit(): void {
    this.selectedParametreTri = this.parametresTri[0];
    this.getWeaponsOrderBy();
  }

  getWeapons(): void {
    this.weaponInterfaceService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  getWeaponsOrderBy(): void {
    this.weaponInterfaceService.getWeapons()
      .subscribe(weapons => {
        // Triez les héros en fonction du paramètre sélectionné
        // @ts-ignore
        this.weapons = weapons.sort((a, b) => b[this.selectedParametreTri] - a[this.selectedParametreTri]);
      });
  }

  deleteWeapon(id: string): void {
    this.weaponInterfaceService.deleteWeapon(id);
  }

  onParametreTriChange(): void {
    // Réagir au changement du paramètre de tri
    this.getWeaponsOrderBy();
  }

  createNewWeapon(): void {
    const newWeapon: Weapon = {
      id: 0,
      name: 'New',
      attaque: 0,
      esquive: 0,
      degats: 0,
      pv: 0,
    };

    this.weaponInterfaceService.addWeapon(newWeapon);
  }

}
