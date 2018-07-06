import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  GoogleMap,
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ApiProvider } from '../../providers/api/api';

  declare var google; // api google
 // var service = new google.maps.DistanceMatrixService();
  var service = new google.maps.DistanceMatrixService;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public map: GoogleMap;
  public distance:any[];
  public lat_user:number
  public lng_user:number
  public arr_destinationAddress:any
  public tieudedi :any[];
  constructor(public navCtrl: NavController,
    private _geolocation: Geolocation,
    public platform : Platform, 
    public _Diagnostic: Diagnostic,
    private _locationAccuracy: LocationAccuracy,
    public api : ApiProvider,
   
  ) {}

 async ionViewDidLoad() {
    await this.platform.ready()
   // await this.load_page(); // chay chinh thich
    this.test_page()
       
  }
// test tren website
  test_page(){
      let lat = 10.8194056;
      let lng = 106.68568690000001;
      this.lat_user = lat;
      this.lng_user = lng;
      this.api.call_map(`http://${this.api.linkAIP}/getPointAround.php`, "post","lat=" +lat + "&lng="+lng)
      .subscribe((result)=>{
        if(result == 0) {
          console.log('khong co dia diem');
          return;
        }
        var arrpoint = [];
        result.forEach(element => {
              arrpoint.push({
                'lat':parseFloat(element.lat),
                'lng':parseFloat(element.lng)
              })
        });
      
      this.call_api_llist_point(arrpoint)
      })
  }



  // request server lay danh sach cac point hop le
  async call_api_llist_point(result)
  {
    var arrpoint = [];
    //dua cac lat va lng cua point vao 1 mang de xu ly
    result.forEach(element => {
      arrpoint.push({'lat':parseFloat(element.lat),'lng':parseFloat(element.lng)})
   });
   // lay duoc thong tin de thien thi
     this.arr_destinationAddress = await this.list_point({lat:10.8194056,lng:106.68568690000001},arrpoint)
   
  }



  async load_page() {
    try{
      let GPS = await this.requirement_GPS()
 
       if(GPS == false){return} ;//Thoat nếu không bật GPS

       // GPS_lang là tọa độ của user
        let GPS_lang = await  this._geolocation.getCurrentPosition()
      
        let lat = GPS_lang.coords.latitude;// vĩ độ
        let lng = GPS_lang.coords.longitude;// khinh độ
        this.lat_user = lat;
        this.lng_user = lng;
        let arr_point = await this.call_get_arrpoint(lat,lng)

        this.arr_destinationAddress = await this.list_point({lat:lat,lng:lng},arr_point)
    } catch(err){
        alert(JSON.stringify(err))
    }
  }
    
    //yeu cau thiet bi phai bat GPS
    requirement_GPS() :Promise<any>
    {
      return new Promise((resolve, reject) => {
        this._locationAccuracy.canRequest()
        .then((canRequest: boolean) => {
          if(canRequest) {
            this._locationAccuracy.request(this._locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
            .then((data) => resolve(data),
                  error => reject(error)
            );
          }

        });//_locationAccuracy

      })
    }
    call_get_arrpoint(lat,lng): Promise<any[]>
    {
      return new Promise((resolve, reject)=>{
       this.api.call_map(`http://${this.api.linkAIP}/getPointAround.php`, "post","lat=" +lat + "&lng="+lng)
        .subscribe((result)=>{
          var arrpoint = [];
          result.forEach(element => {
                arrpoint.push({
                  'lat':parseFloat(element.lat),
                  'lng':parseFloat(element.lng)
                })
          });
          resolve(arrpoint) ;
        },(err)=>{reject(err) })
      })
    }

  
  public list_point($user_lang,$arrpoint): Promise<any[]>
  {
    return new Promise((resolve, reject)=>{
      service.getDistanceMatrix({origins: [$user_lang], destinations: $arrpoint,travelMode: 'DRIVING',},
      (response, status)=>{
  
          if (status !== 'OK') {
              alert('Error was: ' + status);
              reject(status)
              return;
            } 
        
          var destinationList = response.destinationAddresses;
          var results   = response.rows[0].elements;
          let ds_point  = [];

          for (let i =0; i < results.length; i++  ) {
            ds_point.push({
              langt :$arrpoint[i],
              address:destinationList[i],
              distance:results[i].distance,
              duration:results[i].duration
            });
          }

          // sort lai danh sach
          var ds_point_sort =  ds_point.sort((a,b)=>{
            return a.distance.value - b.distance.value 
          });
          // tra ve ket qua danh sach 
          resolve(ds_point_sort);

        }
        ,(err)=>reject(err));
    });
    
  }

  //===== HÀM PUSH QUA TRANG CHỈ DƯỜNG =======

  public push_diretion(langt)
  {
    this.navCtrl.push('DirectionMapPage',{langt : langt,lat_user:this.lat_user,lng_uer:this.lng_user});
  }

  
}
