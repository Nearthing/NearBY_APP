import { Component } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, LoadingController } from 'ionic-angular';
import {GoogleMap,} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ApiProvider } from '../../providers/api/api';

declare var google; // api google
var service = new google.maps.DistanceMatrixService;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public map: GoogleMap;
  public distance: any[];
  public lat_user: number
  public lng_user: number
  public arr_destinationAddress: any
  public tieudedi: any[];
  constructor(public navCtrl: NavController,
    private _geolocation: Geolocation,
    public platform: Platform,
    public _Diagnostic: Diagnostic,
    private _locationAccuracy: LocationAccuracy,
    public api: ApiProvider,
    public alert: AlertController,
    public loadControl: LoadingController

  ) { }

  async  ngAfterViewInit() {
    await this.platform.ready();
    let load_ds_point = this.loadControl.create({
      content: 'Đang tải...'
    })
    load_ds_point.present();
    await this.load_page(); // chay chinh thich
    //await this.test_page()
    load_ds_point.dismiss();
  }
  // test tren website
  test_page() {
     //tao loading trong thoi gian loa danh sach
    let lat = 10.8194056;
    let lng = 106.68568690000001;
    this.lat_user = lat;
    this.lng_user = lng;
    this.api.callApi(`http://${this.api.linkAIP}/getPointAround.php`, "post", "lat=" + lat + "&lng=" + lng)
      .subscribe((result) => {
        console.log(result);
        if (result == 0) {
          console.log('khong co dia diem');
          return;
        }

        this.call_api_llist_point(result)
      })
      
  }



  // request server lay danh sach cac point hop le
  async call_api_llist_point(result) {
    this.arr_destinationAddress = await this.list_point({ lat: 10.8194056, lng: 106.68568690000001 }, result)
  }



  async load_page() {
    try {
      let GPS = await this.requirement_GPS()
       console.log(GPS)
      if (GPS == false) { return };//Thoat nếu không bật GPS

      // GPS_lang là tọa độ của user
      let GPS_lang = await this._geolocation.getCurrentPosition()
      console.log(GPS_lang)
      let lat = GPS_lang.coords.latitude;// vĩ độ
      let lng = GPS_lang.coords.longitude;// khinh độ
      this.lat_user = lat;
      this.lng_user = lng;
      //tao loading trong thoi gian loa danh sach
     
      let arr_point = await this.call_get_arrpoint(lat, lng)
      this.arr_destinationAddress = await this.list_point({ lat: lat, lng: lng }, arr_point)
      
    } catch (err) {
     console.log(err)
    }
  }

  //yeu cau thiet bi phai bat GPS
  requirement_GPS(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._locationAccuracy.canRequest()
        .then((canRequest: boolean) => {
          if (canRequest) {  
            this._locationAccuracy.isRequesting().then((data)=>{
              console.log(data);
              this._locationAccuracy.request(this._locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
              .then((data) => resolve(data),
                error => reject(error)
              );
            })
             
          } else {
            console.log('khong yeu cau duoc GPS')
          }

        });//_locationAccuracy

    })
  }
  // lay danh sach point o server
  call_get_arrpoint(lat, lng): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.api.callApi(`http://${this.api.linkAIP}/getPointAround.php`, "post", "lat=" + lat + "&lng=" + lng)
        .subscribe((result) => {
          console.log(result)
          resolve(result);
        }, (err) => { reject(err) })
    })
  }


  public list_point($user_lang, $arrpoint): Promise<any[]> {



    var arr_point = [];
    $arrpoint.forEach(element => {
      arr_point.push({
        'lat': parseFloat(element.lat),
        'lng': parseFloat(element.lng)
      })
    });

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix({ origins: [$user_lang], destinations: arr_point, travelMode: 'DRIVING', },
        (response, status) => {
          if (status !== 'OK') {
            alert('Error was: ' + status);
            reject(status)
            return;
          }
          var results = response.rows[0].elements;
          var ds_point_perf = [];
          for (let i = 0; i < results.length; i++) {
            ds_point_perf.push({
              distance: results[i].distance,
              duration: results[i].duration,
              point: $arrpoint[i]
            });
          }
          console.log(ds_point_perf);
          // sort lai danh sach
          var ds_point_sort = ds_point_perf.sort((a, b) => {
            return a.distance.value - b.distance.value
          });
          // tra ve ket qua danh sach 
          resolve(ds_point_sort);

        }
        , (err) => reject(err));
    });


  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
      this. ngAfterViewInit();
      refresher.complete();
  }

  doInfinite(infiniteScroll) {
    // console.log('Begin async operation');

    setTimeout(() => {
      // this.position += 20;
      // this.LoadListCus();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  //===== HÀM PUSH QUA TRANG CHỈ DƯỜNG =======

  public push_shop(point) {
    this.navCtrl.push('ShopPage', { point: point });
  }


}
