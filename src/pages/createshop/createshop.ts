import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ApiProvider } from '../../providers/api/api';
declare var $;
@IonicPage()
@Component({
  selector: 'page-createshop',
  templateUrl: 'createshop.html',
})
export class CreateshopPage {
  @ViewChild('map_canvas') mapElement: ElementRef;
  base64Image: string = 'assets/imgs/imageShop.png';
  public _center = {
    lat: 10.7724091,
    lng: 106.69821830000001
  };
  public login :string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public api: ApiProvider
  ) {
    
  }
  ionViewDidEnter(){
    
      this.login =  sessionStorage.getItem('login')
    setTimeout(()=>{
      $("#address").geocomplete({
        map: "#map_canvas",
        mapOptions: {
            center:this._center,
            zoom: 16
        },
        markerOptions: {
            draggable: true
        },
        details: "#form_geo"
  
      }).bind('geocode:dragged', function(event, result) {
          $('#lat').val(result.lat);
          $('#lng').val(result.lng);
      });
    },100);
     
  
  }
  

  openGallery() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  openCamera() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
 
  AddNewShop(name, keyword, address, phone, opentime, closetime, catagory) {
;
    let kinh = $('#lat').val();
    let vi = $('#lng').val();
    console.log( 'data=====',name, keyword, address, phone, opentime, closetime, catagory, kinh, vi, sessionStorage.getItem("id_member"))
    let loading = this.loadingCtrl.create({
      content: 'Đang tải ...'
    });
    loading.present();
    this.api.callApi("http://" + this.api.linkAIP + "/add_shops.php", "post",
      "name=" + name + "&keyword=" + keyword + "&address=" + address + "&phone=" +
      phone + "&opentime=" + opentime + "&closetime=" + closetime + "&id_category=" +
      catagory + "&photo=" + this.base64Image + "&id_member=" + sessionStorage.getItem("id_member") +
      "&lat=" + kinh + "&lng=" + vi)
      .subscribe((res) => {
        console.log("add shop: ", res);
        loading.dismiss();
        this.showAlert(res);
      }, (err) => {
        console.log(err);
      });

    // tét thu 
    
  }

  showAlert(value) {
    let alert = this.alertCtrl.create({
      title: value != 0 ? 'THÀNH CÔNG' : 'THẤT BẠI',
      subTitle: value != 0 ? 'Thêm cửa hàng thành công!' : 'Thêm lỗi',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setPages([{page:'CreateshopPage'}])
          }
        },
      ]
    });
    alert.present();
  }

}
