import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public dataApiUrl:string=environment.baseApiUrl;
  constructor(private httpclient: HttpClient) { }
  
   setZipCodes(data:any)
   {
      localStorage.setItem("zipData",JSON.stringify(data));
   }
   getZipCodes()
   {
     return JSON.parse(localStorage.getItem("zipData"));
   }
   setWeatherInfo(data:any)
   {
      localStorage.setItem("weatherInfo",JSON.stringify(data));
   }
   getWeatherInfo()
   {
     return JSON.parse(localStorage.getItem("weatherInfo"));
   }
   clearLocalStorage()
   {
    localStorage.removeItem("weatherInfo");
    localStorage.removeItem("zipData");
   }
   getWeather(zip,country):Observable<any>
   {
     
     return this.httpclient.get<any>(this.dataApiUrl+"weather?zip="+zip+","+country+"&appid=5a4b2d457ecbef9eb2a71e480b947604&units=imperial").pipe(catchError(this.handleError));
   }
   getForecast(zip,country):Observable<any>
   {
     
     return this.httpclient.get<any>(this.dataApiUrl+"forecast/daily?zip="+zip+","+country+"&appid=5a4b2d457ecbef9eb2a71e480b947604&units=imperial&cnt=5").pipe(catchError(this.handleError));
   }
   handleError(error)
   {
      return throwError(error.message || "Server Error");
   }
}
