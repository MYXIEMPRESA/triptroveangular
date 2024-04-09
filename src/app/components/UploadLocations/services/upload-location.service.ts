import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, onSnapshot, query, startAfter, limit } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, getStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import Place from '../interfaces/place.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesSubject = new Subject<Place[]>();
  places$: Observable<Place[]> = this.placesSubject.asObservable();
  getAllPlaces: any;

  constructor(private firestore: Firestore) {
    this.subscribeToPlacesChanges();
  }

  addPlace(place: Place) {
    const placeRef = collection(this.firestore, 'places');
    return addDoc(placeRef, { ...place, image: null });
  }

  private subscribeToPlacesChanges() {
    const placeRef = collection(this.firestore, 'places');
  
    onSnapshot(placeRef, (querySnapshot) => {
      const places: Place[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const place: Place = {
          id: doc.id,
          ...(data as Place)
        };
        places.push(place);
      });
  
      this.placesSubject.next(places);
    });
  }
  
  
  deletePlace(place: Place) {
    const placeDocRef = doc(this.firestore, `places/${place.id}`);
    return deleteDoc(placeDocRef);
  }

  async uploadImage(image: File): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
}
