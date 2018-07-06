import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapOptions, GoogleMaps, Marker } from '@ionic-native/google-maps';

/**
 * Generated class for the DirectionMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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
    public platforms: Platform,
    public navParams: NavParams) {
  }

 async ionViewDidLoad() {
      await this.platforms.ready();
      this.initMap();
  }
  initMap() {
    var langt =  this.navParams.get('langt');
    var lat_user:number =  this.navParams.get('lat_user');
    var lng_uer:number =  this.navParams.get('lng_uer');
    console.log(lat_user)
    console.log(langt);

    this.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 20,
      center: {lat: lat_user, lng: lng_uer}
    });
    
     directionsDisplay.setMap(this.map);
     this.calculateAndDisplayRoute(langt,lat_user,lng_uer) 
  }
  calculateAndDisplayRoute(langt,lat_user,lng_uer) {
    directionsService.route({
      // origin: {lat: $lat, lng: $lng},
      // destination: lang_end,
      origin: {lat: lat_user, lng:lng_uer},
      destination: langt,
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
