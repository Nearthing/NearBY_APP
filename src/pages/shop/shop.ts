import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, IonicPage, LoadingController } from 'ionic-angular';
import { FormGroup } from '../../../node_modules/@angular/forms';
import { ApiProvider } from '../../providers/api/api';
declare var $;
@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {

  point: any;
  @ViewChild('pageSlider') pageSlider: Slides;
  tabs: any = '0';
  rateStar: number = 0;
  comments: any[] = [];
  position: number = 0;
  imgShop: string = "assets/imgs/imageShop.png";
  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private navparas: NavParams,
    public api: ApiProvider
  ) {
    this.point = this.navparas.get("point");
    if (this.point.point.photo.length > 0)
      this.imgShop = "http://nearbyvn.com/Images/"+this.point.point.photo;
    this.LoadComment();
  }

  doInfinite(infiniteScroll) {
    this.position += 10;
    this.LoadComment();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  callWithNumber(mobileNumber) { window.open("tel:" + mobileNumber); }

  mapPage() {
    this.navCtrl.push('DirectionMapPage', { nameshop: this.point.point.nameshop, address: this.point.point.address });
  }

  RateStar(star) {
    switch (star) {
      case 1:
        this.rateStar = 1;
        break;
      case 2:
        this.rateStar = 2;
        break;
      case 3:
        this.rateStar = 3;
        break;
      case 4:
        this.rateStar = 4;
        break;
      case 5:
        this.rateStar = 5;
        break;
      default: this.rateStar = 0;
    }
  }


  SendComment(name, comment) {
    // console.log("id shop", this.point.point.id);

    let loading = this.loadingCtrl.create({
      content: 'Đang tải ...'
    });
    loading.present();
    this.api.callApi("http://" + this.api.linkAIP + "/add_votes.php", "post", "id_shop=" + this.point.point.id + "&votes_value=" + this.rateStar + "&comment=" + comment + "&user=" + name)
      .subscribe((data) => {

        // console.log("data insert comment: ", data);
        if (data != 0) {
          this.position = 0;
          this.comments = [];
          this.LoadComment();
          $('#name').val('');
          $('#comment').val('');
        }
        loading.dismiss();
      }, (err) => {
        console.log(err);
      });
  }

  LoadComment() {
    this.api.callApi("http://" + this.api.linkAIP + "/load_comments.php", "post", "id_shop=" + this.point.point.id + "&position=" + this.position)
      .subscribe((data) => {
        console.log("url: ", this.point.point.photo);
        if (data != 0){
          this.comments = this.comments.concat(data);
          // this.imgShop = "http://" + this.api.ImageUrl + this.point.point.photo;
          
        }
          
      }, (err) => {
        console.log(err);
      });
  }
}
