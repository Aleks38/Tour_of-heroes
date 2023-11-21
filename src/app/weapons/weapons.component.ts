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
  selectedParametreTri = this.parametresTri[0];
  searchTerm: string = '';

  constructor(private weaponInterfaceService: WeaponInterfaceService) {
  }

  ngOnInit(): void {
    this.selectedParametreTri = this.parametresTri[0];
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponInterfaceService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  getWeaponsOrderBy(): void {
    // @ts-ignore
    this.weapons = this.weapons.sort((a, b) => b[this.selectedParametreTri] - a[this.selectedParametreTri]);

  }

  onSearch(): void {
    if (this.searchTerm != '') {
      this.weapons = this.weapons.filter((hero) =>
        hero.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.getWeaponsOrderBy()
    }
  }

  resetSearchBar(): void {
    this.searchTerm = ''
    this.getWeapons()
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

  deleteWeaponConfirmation(weaponId: string): void {
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce weapon ?');

    if (isConfirmed) {
      this.deleteWeapon(weaponId);
    }
  }

}
