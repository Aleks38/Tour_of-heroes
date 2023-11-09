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

  constructor(private weaponInterfaceService: WeaponInterfaceService) {
  }

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponInterfaceService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  deleteWeapon(id: string): void {
    this.weaponInterfaceService.deleteWeapon(id);
  }

}
