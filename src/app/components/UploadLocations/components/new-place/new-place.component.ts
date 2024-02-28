// new-place.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import Place from '../../interfaces/place.interface';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css']
})
export class NewPlaceComponent implements OnInit {

  categories = ['cultural', 'historia', 'familiar', 'naturaleza', 'parques', 'museos', 'diversion'];

  formulario: FormGroup;

  constructor(private placesService: PlacesService) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      latitude: new FormControl(),
      longitude: new FormControl(),
      description: new FormControl(),
      image: new FormControl(null),
      categories: new FormArray([]) 
    });
    alert(this.categories)
  }

  ngOnInit(): void {
  }

  toggleCategory(category: string) {
    const currentCategories = this.formulario.get('categories') as FormArray;
    const index = currentCategories.value.indexOf(category);

    if (index !== -1) {
      currentCategories.removeAt(index);
    } else {
      currentCategories.push(new FormControl(category));
    }
  }


  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.formulario.patchValue({ image: file });
  }

  async onSubmit() {
    const placeData: Place = this.formulario.value;
    if (placeData.image) {
      const imageURL = await this.placesService.uploadImage(placeData.image);
      placeData.imageURL = imageURL;
    }

    const response = await this.placesService.addPlace(placeData);
    console.log(response);
  }
}
