import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, IonicPage } from 'ionic-angular';
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
  comments = [
    { Name: "Nguyen van a", RateStar: 1, CommentDate: "02/07/2016", Content: "Get your music, movies, TV, news, books, magazines, apps and games all in one place, instantly on your phone, tablet, computer or TV. And all the things you love about Google are built-in, so the more you play, the better it gets. " },
    { Name: "Tran van a", RateStar: 3, CommentDate: "02/07/2017", Content: "ok ok" },
    { Name: "Le van a", RateStar: 2, CommentDate: "04/06/2018", Content: "ok uh" },
    { Name: "Nguyen a", RateStar: 4, CommentDate: "02/07/2018", Content: "Get your music, movies, TV, news, books, magazines, apps and games all in one place, instantly on your phone, tablet, computer or TV. And all the things you love about Google are built-in, so the more you play, the better it gets." },
    { Name: "Tra a", RateStar: 5, CommentDate: "02/07/2018", Content: "ok" }
  ];
  constructor(public navCtrl: NavController, private navparas: NavParams) {
    this.point = this.navparas.get("point");
    console.log(this.point)
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

  callWithNumber(mobileNumber) { window.open("tel:" + mobileNumber); }

  mapPage() {
    this.navCtrl.push('DirectionMapPage', { lat_shop: this.point.point.lat, lng_shop: this.point.point.lng });
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

}
