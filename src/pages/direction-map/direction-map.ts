import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GpsProvider } from '../../providers/gps/gps';
import { Diagnostic } from '@ionic-native/diagnostic';

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
  
  public shop:any;
  public map: any;

  constructor(public navCtrl: NavController, 
    public platforms: Platform,public _geolocation: Geolocation,
    public service_GPS: GpsProvider,
    public alert:AlertController,
    public _Diagnostic: Diagnostic,
    public navParams: NavParams) {}

 async ionViewDidLoad() {
      await this.platforms.ready();
      this.initMap();
  }
  // khoi tao bản đồ
  async  initMap() {
    try{
            await this.service_GPS.requirement_GPS()
            
            let GPS_lang = await this._geolocation.getCurrentPosition();
              let lat_user = GPS_lang.coords.latitude;// vĩ độ
              let lng_uer = GPS_lang.coords.longitude;// khinh độ
              //var lat_user = 10.8194056;
              //var lng_uer = 106.68568690000001;
          
                var nameshop :string =  this.navParams.get('nameshop');
                var address :string  =  this.navParams.get('address');
                var address_shop = nameshop+address;
                this.shop ={name : nameshop , address : address};

                this.map = new google.maps.Map(document.getElementById('map_canvas'), {
                  zoom: 20,
                  center: {lat: lat_user, lng: lng_uer}
                });
                
                directionsDisplay.setMap(this.map);
                this.calculateAndDisplayRoute({lat:lat_user,lng:lng_uer},address_shop) 
            

    } catch(err) {
        
     console.log('errrr',err)
     if(err.message = "Illegal Access" && err.code == 1) {
       this.alert.create({
         title:"<h4 style='color:red'>Cảnh Báo</h4>",
         message:'Bạn hãy cân nhấc, nếu vô tình hãy cấp lại quyền vi tri cho ứng dụng',
         buttons:[
         {
           text:'Từ chối',
           cssClass:'color_button',
           handler:()=>{return;},
          
         },
         {
           cssClass:'color_button',
           text: 'Cài đặt vị trí',
           handler:()=>{
             this._Diagnostic.switchToSettings().then(()=>{})
            
             },
          
         }
       ],
         
       }).present()
      
     }
    }
     

  }



  calculateAndDisplayRoute(langt_user,address_shop) {
   console.log(langt_user);
    directionsService.route({
      origin: langt_user,
      destination: address_shop,
      travelMode: 'DRIVING'
    }, (response, status)=>{
    
      if (status === 'OK') {
        new google.maps.DirectionsRenderer({
          map: this.map,
          directions: response,
          suppressMarkers: true
      });
      var leg = response.routes[0].legs[0];
      this.makeMarker(leg.start_location, this.map );
      this.makeMarker(leg.end_location, this.map,false );
     // directionsDisplay.setDirections(response)
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  // tao marker
  makeMarker(position , map ,origin=true) {
    var Animation =true;
    var icon : any = '';
    var info = `<div id ='infowindow'><h5> ${this.shop.name}</h5>
                <p>${this.shop.address} </p></div>`

    if(origin) {
        info = ''
           icon = {
            url : 'https://www.truckly.com/wp-content/uploads/2015/12/iconBlueDot.png',
            scaledSize: new google.maps.Size(50, 50),

            anchor: new google.maps.Point(25,20)
              }
             Animation= false;
     }

    var infowindow = new google.maps.InfoWindow({
         content: info
       });
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon:icon
    });        
      if (Animation) {marker.setAnimation(google.maps.Animation.BOUNCE) } 

      if(!origin) {
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }

     }
}
