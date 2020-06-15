import {Component, Input, OnInit, Output} from '@angular/core'
import {Card} from '../app.component'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  
})
export class WeatherComponent implements OnInit{
  WeatherData: any;
  mainCity: any;
  errorWeather: boolean;
  weatherIcon: any;

  @Input() card: Card

  constructor() {}

  ngOnInit() {
    this.getWeatherData();    
  }

  getWeatherData(){
    console.log(this.card.mainCity)
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.card.mainCity + ' &appid=0fc8c91ace72273ebb9d8fbc781f6c8c')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }
  

  // Получаем данные с API, меняем Фаренгейты на Цельсии, записываем данные в переменные
  
  setWeatherData(data){
    // Проверка найден ли город из поиска
    if (typeof data.name == 'undefined') {
    this.errorWeather = true
    } else {
      // Исправление ошибки загрузки иконок. Скрипт идёт синхронно, дата записывалась асинхронно
      this.WeatherData = null;
      setTimeout(()=>{
        this.WeatherData = data;
        this.errorWeather = false;
        this.SetWeatherDataInfo();
      }, 10)
    }
  }

  recieveMessage($event){
    console.log("dfdf " + $event)
    this.card.mainCity = $event;
    console.log(this.mainCity)
    this.getWeatherData();
  }

  SetWeatherDataInfo(){
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay =  (this.WeatherData.dt > this.WeatherData.sys.sunrise);
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    // temp_min и temp_max являются необязательными параметрами, означающими минимальную / максимальную температуру в городе в текущий момент, просто для справки
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.weather_icon_temp = (this.WeatherData.weather[0].main);

    switch(this.WeatherData.weather_icon_temp) { 
      case "Thunderstorm": { 
         console.log("Thunderstorm"); 
         this.weatherIcon ="fas fa-3x weather-icon fa-cloud-showers-heavy";
         break; 
      } 
      case "Drizzle": { 
         console.log("Drizzle"); 
         this.weatherIcon ="fas fa-3x weather-icon fa-cloud-rain";
         break; 
      } 
      case "Rain": {
         console.log("Rain"); 
         this.weatherIcon ="fas fa-3x weather-icon fa-cloud-rain"; 
         break;    
      } 
      case "Snow": { 
         console.log("Snow"); 
         this.weatherIcon ="fas fa-2x weather-icon fa-snowflake"; 
         break; 
      }  
      case "Haze": { 
         console.log("Haze"); 
         this.weatherIcon ="fas fa-3x weather-icon fa-smog"; 
         break; 
      }  
      case "Clear": { 
         console.log("Clear");
         this.weatherIcon ="weather-icon";
         break; 
      }  
      case "Clouds": { 
         console.log("Clouds"); 
         this.weatherIcon ="fas fa-3x weather-icon fa-cloud";
         break; 
      }  
   }
  }

  day: Date = new Date()

  inputHandler(event: any) {
    let newCity = event.target.value
    this.card.mainCity = newCity
  }

}