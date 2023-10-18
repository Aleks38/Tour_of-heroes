import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {WEAPONS} from "./mock-weapons";
import {MessageService} from './message.service';
import {Weapon} from "./weapon";


@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private messageService: MessageService) {
  }

  getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    this.messageService.add('WeaponService: fetched weapons');
    return weapons;
  }

  getWeapon(id: number): Observable<Weapon> {
    // For now, assume that a weapon with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const weapon = WEAPONS.find(h => h.id === id)!;
    this.messageService.add(`WeaponService: fetched weapon id=${id}`);
    return of(weapon);
  }
}
