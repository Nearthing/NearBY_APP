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

  comments = [
    {Name:"Nguyen van a", RateStar: 4, CommentDate: "02/07/2016", Content:"ok ok"},
    {Name:"Tran van a", RateStar: 4, CommentDate: "02/07/2017", Content:"ok ok"},
    {Name:"Le van a", RateStar: 4, CommentDate: "04/06/2018", Content:"ok uh"},
    {Name:"Nguyen a", RateStar: 4, CommentDate: "02/07/2018", Content:"uh"},
    {Name:"Tra a", RateStar: 4, CommentDate: "02/07/2018", Content:"ok"}
  ];
  constructor(public navCtrl: NavController, private navparas: NavParams) {
    this.point = this.navparas.get("point");
    console.log(this.point)
  }

  selectTab(index) {
    this.pageSlider.slideTo(index);
  }

  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
  }

  mapPage() {
    this.navCtrl.push('DirectionMapPage',{lat_shop:this.point.point.lat,lng_shop:this.point.point.lng});
  }


}
