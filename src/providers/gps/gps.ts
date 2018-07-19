
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';


@Injectable()
export class GpsProvider {

  constructor(public _Diagnostic :Diagnostic,
              public _locationAccuracy:LocationAccuracy,
    
  ) {}
  requirement_GPS(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._Diagnostic.isGpsLocationEnabled().then((data)=>{
        this._locationAccuracy.canRequest().then(data_canreques =>{
              if(data_canreques) {
                    this._locationAccuracy.request(this._locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
                  .then(data =>{
                    console.log('request GPS',data)
                    resolve(data)
                  },err=>{
                    reject(err)
                  })
              } else {
                  this._locationAccuracy.request(this._locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
                  .then(data =>{
                    console.log('request GPS',data)
                    resolve(data)
                  },err=>{
                    reject(err)
                  })
              }
        })//---canRequest
      })//--isGpsLocationEnabled
    })
  }

}
