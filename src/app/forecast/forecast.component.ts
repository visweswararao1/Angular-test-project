import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WeatherService } from './../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  public forecastData:any=[];
  public weatherSnow:any=['snow','mist','smoke','haze','dust','fog','sand','dust','ash','squall','tornado'];
  public weatherRain:any=['rain','thunderstorm','drizzle'];
  public error:string;
  public loading:boolean=false;
  constructor(private router:Router,private weather:WeatherService,private route: ActivatedRoute) { }

  ngOnInit() {
     let zipCode=this.route.snapshot.paramMap.get('id');
     this.loading=true;
    
      this.weather.getForecast(zipCode,'us').subscribe(data=>{
        data['zipcode']=zipCode;
        this.forecastData=data;
        this.loading=false;
        this.error="";
        },error=>{
          this.error="No Data Found";
          this.loading=false;
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
  goBack()
  {
    this.router.navigate(['/']);
  }
}
