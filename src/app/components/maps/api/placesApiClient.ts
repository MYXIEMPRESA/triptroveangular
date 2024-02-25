import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn : 'root'
})
export class PlacesApiClient extends HttpClient{

    public baseUrl : string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

    constructor( handler: HttpHandler){
        super(handler);
    }

    public override get<T>(url: string, options: { params?: HttpParams | {[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>}; }) {
        url = `${this.baseUrl}${url}`;

        const additionalParams: { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> } = {
            limit: 4,
            language: 'es',
            access_token: environment.apiKey,
            ...options.params
        };

        additionalParams['bbox'] = '-99.3269,19.1056,-98.5636,19.7039';

        return super.get<T>(url, { params: additionalParams });
    }    
}