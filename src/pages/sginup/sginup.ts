import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-sginup',
  templateUrl: 'sginup.html',
})
export class SginupPage {
  @ViewChild('phone_sginUP')
  phone_sginUP:any
  public user_sginup : FormGroup;
  submitAttempt: boolean 
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public api:ApiProvider,
    public alert: AlertController,
    public navParams: NavParams) {
      this.validate();
  }

  ionViewDidLoad() {
    
  }
 
  validate()
  {  
    let password = new FormControl('', Validators.required);
    let again_password = new FormControl('' ,CustomValidators.equalTo(password));
    let name = new FormControl('', Validators.required);
    this.user_sginup = this.formBuilder.group({
      name:name,
      phone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(12),Validators.required])],
      password: password ,
      again_password :  again_password,
  
    });
  }//---->validate'', CustomValidators.equalTo(password)
  sginup(){
     
    console.log(this.user_sginup.controls);
      if(!this.user_sginup.valid) {
        this.submitAttempt = true;
        return;
      }

      var user =  this.user_sginup.value;
      this.api.callApi(`http://${this.api.linkAIP}/sginUp_nember.php`,
      "post", "phonenumber=" +user.phone.trim() + "&password=" +user.password.trim() +"&name="+user.name.trim() )
      .subscribe((data)=>{
        if(data != 1) {
          let alert = this.alert.create({
            title :'Thất Bại',
            message : 'Đăng ký THẤT BẠI , số điện thoại đã được đăng ký ',
            buttons :[{
              text : 'OK',
              role : 'cancel',
              handler : () =>{
                this.phone_sginUP.nativeElement.focus()
              }
            }]
          })
          alert.present();
          return;
        }
       let alert = this.alert.create({
          title :'Thành công',
          message : 'Đăng ký THÀNH CÔNG ',
          buttons :[{
            text : 'OK',
            handler : () =>{
              
              this.navCtrl.setRoot('AboutPage',{user : user}); 
            }
          }]
        })
        alert.present()
      })


  }


}
