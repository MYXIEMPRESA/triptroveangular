import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-ubication-range',
  templateUrl: './ubication-range.component.html',
  styleUrls: ['./ubication-range.component.css']
})
export class UbicationRangeComponent {

  constructor(private mapService:MapService){}

  selectedTime: string = '';

  onTimeSelectionChange(selectedTimes: String) {
    selectedTimes = this.selectedTime;
    this.mapService.distancePolyline(selectedTimes)
  }
}
