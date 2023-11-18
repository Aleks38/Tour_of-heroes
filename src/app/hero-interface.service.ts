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
import {Hero} from "./hero";

@Injectable({
  providedIn: 'root'
})
export class HeroInterfaceService {

  private static url = 'heroes';

  constructor(private firestore: Firestore) {
  }

  getHeroes(): Observable<Hero[]> {
    // get a reference to the hero collection
    const heroCollection = collection(this.firestore, HeroInterfaceService.url);
    ///////////
    // Solution 1 : Transformation en une liste d'objets "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return collectionData(heroCollection, {idField: 'id'}) as Observable<Hero[]>;
  }

  getHero(id: string): Observable<Hero> {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, HeroInterfaceService.url + "/" + id);
    ///////////
    // Solution 1 : Transformation en un objet "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return docData(heroDocument, {idField: 'id'}) as Observable<Hero>;
  }

  addHero(hero: Hero): void {
    // get a reference to the hero collection
    const heroCollection = collection(this.firestore, HeroInterfaceService.url);
    //
    addDoc(heroCollection, hero);
  }

  updateHero(hero: Hero): void {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, HeroInterfaceService.url + "/" + hero.id);
    // Update du document à partir du JSON et du documentReference
    let newHeroJSON = {
      name: hero.name,
      attaque: hero.attaque,
      esquive: hero.esquive,
      degats: hero.degats,
      pv: hero.pv,
      idWeapon: hero.idWeapon,
    };

    updateDoc(heroDocument, newHeroJSON);
  }

  deleteHero(id: string): Promise<void> {
    // Récupération du DocumentReference
    const heroDocument = doc(this.firestore, HeroInterfaceService.url + "/" + id);
    //
    return deleteDoc(heroDocument);
  }
}
