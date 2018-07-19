import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Searchbar } from 'ionic-angular';
declare var google;
var service = new google.maps.DistanceMatrixService;

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
@ViewChild(Searchbar) searchbar: Searchbar;
public arr_destinationAddress:any;
public lat_user:number;
public lng_user:number;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public api:ApiProvider,
    public loadControl: LoadingController
    ) {
      
      this.lat_user = this.navParams.get('lat_user');
      this.lng_user = this.navParams.get('lng_user');
    }
    ionViewDidEnter() {
      setTimeout(() => {
        this.searchbar.setFocus();
   });
  } 
  ionViewDidLoad() {}
  
  async search($event){
         
        
          let val = $event.target.value;
      

        if (val && val.trim() != '') {
          let load_ds_point = this.loadControl.create({
            spinner: 'hide',
            content: `
                <div class="custom-spinner-container">
                  <img class="loading" src="assets/icon/slack_load.gif"  />
                </div>`,
              cssClass :"css_loading"
          })
          load_ds_point.present();
         let data_search = await this.call_search(val, this.lat_user, this.lng_user )
          load_ds_point.dismiss();
          if(data_search[0] == 0 || data_search[0] == null) {
            load_ds_point.dismiss();
            this.arr_destinationAddress = 0;
            return;
          }
          
          this.arr_destinationAddress = await this.list_point({ lat:  this.lat_user, lng:  this.lng_user }, data_search)
         
          // console.log('search-->', this.arr_destinationAddress)      
        }
    
    

  }

  call_search(keyowrd,lat, lng): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.api.callApi(`http://${this.api.linkAIP}/search.php`, "post",
       "search_word="+keyowrd)
        .subscribe((result) => {
          console.log(result)
          if(result == 0) {
            result = [0];
          }
          resolve(result);
        }, (err) => { reject(err) })
    })
  }
  public push_shop(point) {
    this.navCtrl.push('ShopPage', { point: point });
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
          console.log('lít-->',ds_point_perf);
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
}
