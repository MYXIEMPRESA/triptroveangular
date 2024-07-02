import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, getDocs, query, orderBy, limit, startAfter } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Place } from '../interfaces/place.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private placesSubject = new BehaviorSubject<Place[]>([]);
  places$: Observable<Place[]> = this.placesSubject.asObservable();
  private lastVisible: any;

  

  constructor(private firestore: Firestore) {
    this.loadPlaces();
  }


  
  async addPlace(place: Place) {
    const placeRef = collection(this.firestore, 'places');
    const docRef = await addDoc(placeRef, place);
    return docRef.id;
  }

  private async loadPlaces() {
    const placeRef = collection(this.firestore, 'places');
    const q = query(placeRef, orderBy('name'), limit(10));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const places: Place[] = querySnapshot.docs.map(doc => {
          console.log(doc.data());  // Ver los datos de cada documento
          return { id: doc.id, ...(doc.data() as Place) };
        });
        this.placesSubject.next(places);
        console.log('Loaded places:', places);
      } else {
        console.log('No places found in the database.');
      }
    } catch (error) {
      console.error('Error loading places from Firestore:', error);
    }
  }

  async loadMorePlaces() {
    if (!this.lastVisible) return;
    const placeRef = collection(this.firestore, 'places');
    const q = query(placeRef, orderBy('name'), startAfter(this.lastVisible), limit(10));
    const querySnapshot = await getDocs(q);
    this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const newPlaces = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Place) }));
    this.placesSubject.next([...this.placesSubject.value, ...newPlaces]);
  }

  async deletePlace(place: Place) {
    const placeDocRef = doc(this.firestore, `places/${place.id}`);
    await deleteDoc(placeDocRef);
  }
}
