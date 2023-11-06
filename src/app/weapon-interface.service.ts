import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Weapon} from "./weapon";

@Injectable({
  providedIn: 'root'
})
export class WeaponInterfaceService {

  private static url = 'weapons';

  constructor(private firestore: Firestore) {
  }

  getWeapons(): Observable<Weapon[]> {
    // get a reference to the weapon collection
    const weaponCollection = collection(this.firestore, WeaponInterfaceService.url);
    ///////////
    // Solution 1 : Transformation en une liste d'objets "prototype" de type Weapon
    // get documents (data) from the collection using collectionData
    return collectionData(weaponCollection, {idField: 'id'}) as Observable<Weapon[]>;
  }

  getWeapon(id: string): Observable<Weapon> {
    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponInterfaceService.url + "/" + id);
    ///////////
    // Solution 1 : Transformation en un objet "prototype" de type Weapon
    // get documents (data) from the collection using collectionData
    return docData(weaponDocument, {idField: 'id'}) as Observable<Weapon>;
  }

  deleteWeapon(id: string): Promise<void> {
    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponInterfaceService.url + "/" + id);
    //
    return deleteDoc(weaponDocument);
  }

  addWeapon(weapon: Weapon): void {
    // get a reference to the hero collection
    const heroCollection = collection(this.firestore, WeaponInterfaceService.url);
    //
    addDoc(heroCollection, weapon);
  }

  updateWeapon(weapon: Weapon): void {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, WeaponInterfaceService.url + "/" + weapon.id);
    // Update du document à partir du JSON et du documentReference
    let newHeroJSON = {
      name: weapon.name,
      attaque: weapon.attaque,
      esquive: weapon.esquive,
      degats: weapon.degats,
      pv: weapon.pv
    };
    updateDoc(heroDocument, newHeroJSON);
  }
}
