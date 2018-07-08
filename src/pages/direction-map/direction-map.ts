import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
@IonicPage()
@Component({
  selector: 'page-direction-map',
  templateUrl: 'direction-map.html',
})
export class DirectionMapPage {
  @ViewChild('map_canvas') mapElement: ElementRef;
  
  public map: any;
  constructor(public navCtrl: NavController, 
    public platforms: Platform,public _geolocation: Geolocation,
    public navParams: NavParams) {
  }

 async ionViewDidLoad() {
      await this.platforms.ready();
      this.initMap();
  }
   initMap() {
   this._geolocation.getCurrentPosition().then((GPS_lang)=>{
        let lat_user = GPS_lang.coords.latitude;// vĩ độ
        let lng_uer = GPS_lang.coords.longitude;// khinh độ
      
      
        var lat_shop :number =  parseFloat(this.navParams.get('lat_shop'));
        var lng_shop:number =  parseFloat(this.navParams.get('lng_shop'));
        
        this.map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 15,
          center: {lat: lat_user, lng: lng_uer}
        });
        
        directionsDisplay.setMap(this.map);
        this.calculateAndDisplayRoute({lat:lat_shop,lng:lng_shop},{lat:lat_user,lng:lng_uer}) 
    },(err)=>{alert('loi'+err)});//_geolocation
  }
  calculateAndDisplayRoute(langt_shop,langt_user) {
    console.log(langt_shop,langt_user)
    directionsService.route({

      origin: langt_user,
      destination: langt_shop,
      travelMode: 'DRIVING'
    }, (response, status)=>{
     
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


}
