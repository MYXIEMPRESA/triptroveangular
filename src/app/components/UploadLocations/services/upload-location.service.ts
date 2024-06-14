import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, query, orderBy, limit, startAfter, getDocs } from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL, getStorage, uploadBytes } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import Place from '../interfaces/place.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private placesSubject = new Subject<Place[]>();
  places$: Observable<Place[]> = this.placesSubject.asObservable();
  private lastVisible: any;

  constructor(private firestore: Firestore) {
    this.loadPlaces();
  }

  addPlace(place: Place) {
    const placeRef = collection(this.firestore, 'places');
    return addDoc(placeRef, { ...place, imageURL: place.imageURL || null });
  }

  private async loadPlaces() {
    const placeRef = collection(this.firestore, 'places');
    const q = query(placeRef, orderBy('name'), limit(10));
    const querySnapshot = await getDocs(q);
    this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const places: Place[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Place)
    }));

    this.placesSubject.next(places);
  }

  async loadMorePlaces() {
    if (!this.lastVisible) {
      return;
    }

    const placeRef = collection(this.firestore, 'places');
    const q = query(placeRef, orderBy('name'), startAfter(this.lastVisible), limit(10));
    const querySnapshot = await getDocs(q);
    this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const newPlaces: Place[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Place)
    }));

    const currentPlaces = await this.places$.toPromise() || [];
    this.placesSubject.next([...currentPlaces, ...newPlaces]);
  }

  async uploadImage(image: File): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  deletePlace(place: Place) {
    const placeDocRef = doc(this.firestore, `places/${place.id}`);
    return deleteDoc(placeDocRef);
  }
}
