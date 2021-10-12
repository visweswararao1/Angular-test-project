import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../weather.service'; 
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public zipcode:number;
  public zipList:any=[];
  public weatherList:any=[];
  public weatherSnow:any=['snow','mist','smoke','haze','dust','fog','sand','dust','ash','squall','tornado'];
  public weatherRain:any=['rain','thunderstorm','drizzle'];
  public error:string;
  public addLocation:string="Add location";
  constructor(private weather:WeatherService) { }


  ngOnInit() {
  
    if(this.weather.getWeatherInfo())
    this.weatherList=this.weather.getWeatherInfo();
  }
  addZipCode() { 
       this.error="";
      if(this.weather.getZipCodes() != null)
      {
        this.zipList=this.weather.getZipCodes();
        if(this.zipList.indexOf(this.zipcode)> -1)
        {
          this.error="Duplicate zipcode";
          return false;
          
        }
      }
     
      

      
      this.addLocation="Adding Location...";
      this.weather.getWeather(this.zipcode,'us').subscribe(data=>{
            data['zipcode']=this.zipcode;
            this.weatherList.push(data);
            this.weather.setWeatherInfo(this.weatherList);
            this.addLocation="Add location";
            this.zipList.push(this.zipcode);
            this.weather.setZipCodes(this.zipList);
      },error=>{
         this.error="Invalid Data";
         this.addLocation="Add location";
      });
      
      
  }
  checkSnow(e)
  {
     if(this.weatherSnow.indexOf(e)>-1) return true;
     else return false;
  }
  checkRain(e)
  {
     if(this.weatherRain.indexOf(e)>-1) return true;
     else return false;
  }
  Close(index)
  {
    if(this.weather.getWeatherInfo() != null)
    {
      this.zipList=this.weather.getZipCodes();
      let ind= this.zipList.indexOf(this.weatherList[index].zipcode);
      this.zipList.splice(ind,1);
      this.weather.setZipCodes(this.zipList);
      this.weatherList.splice(index,1)
      if(this.weatherList.length)
      this.weather.setWeatherInfo(this.weatherList);
      else
      this.weather.clearLocalStorage();
    }
  }


}
