// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import { DatabaseProvider } from '../../providers/database/database';


// @IonicPage()
// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html',
// })
// export class LoginPage {

//   constructor(public navCtrl: NavController, 
//     public loadingCtrl:LoadingController,
//     public db:DatabaseProvider,
//     public navParams: NavParams) {
//   }
  
//   ionViewDidLoad() {
//     console.log('ionViewDidLoad LoginPage');
//   }
//   async login(user)
//   {
//     // set USER to sqlite
//       this.db.putUser(user.username, user.password, user.checked, true)
      
//       this.api.call_login(`http://${this.api.linkAIP}/php/app/checklogin_app.php`,
//        "post", "username=" +user.username + "&password=" +user.password )
//         .subscribe((res) => {
//           this.giangvien= res;
//           if (res == 0) {
//             loading.dismiss()
//             setTimeout(()=>{
//               this.alertCtrl.create({ 
//                   message: 'Sai tài khoản hoặc mật khẩu!',
//                   buttons: [{ text: 'OK',
//                       handler: data => console.log(res)
//                     }]
//                 }).present();
//             },500)
//             return;
//           }

//           // sessionStorage.setItem("id_gv");
//           // sessionStorage.setItem('user_token',res.jwt)
//             // set JSON WEB TOKEN
//             this.db.set_JWT(res.jwt)
//             .then((data)=>{})
//             // set player_id cua app
//             var dangky = new Promise((resolve,reject) =>{
//               window["plugins"].OneSignal
//             .getPermissionSubscriptionState((jsonData)=> {resolve(jsonData.subscriptionStatus.userId)})
//             })

//            dangky.then((data)=>{
             
//               this.api.callApi(`http://${this.api.linkAIP}/php/app/dangky_player.php`,
//                "post", "player_id=" +data + "&id_gv=" +this.giangvien.id_gv + "&nhanthongbao=1"  )
//               .subscribe((res)=>{})//alert('dangky_player:'+this.giangvien.id_gv)
//             })
//             // chuyen sang  home 
            
                
               
//         }, (err) => {
//           this.navCtrl.setRoot('HomePage',{ type: 'icons-only'},{animate : true})
//           alert("error network")
//         })
//   }
// }
