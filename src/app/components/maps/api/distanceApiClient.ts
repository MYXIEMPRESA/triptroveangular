import { HttpClient, HttpHandler} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn : 'root'
})
export class DistanceApiClient extends HttpClient{

    public baseUrl : string = 'https://api.mapbox.com/directions/v5/mapbox';

    constructor( handler: HttpHandler){
        super(handler);
    }

    public override get<T>(url: string) {
        url = this.baseUrl + url;
        return super.get<T>(url, { params: {
            contours_colors: '005a32',
            polygons: 'true',
            denoise: '1',
            generalize: '500',
            access_token: environment.apiKey
        } });
    }     
}
