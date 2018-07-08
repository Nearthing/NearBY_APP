import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  // public database :SQLiteObject
  // constructor(  public storage: SQLite) {}

  // createTbale(optiontable:table)
  // {
  //   return new Promise((resolve, reject)=>{
  //     this.storage.create(optiontable) 
  //     .then((db : SQLiteObject) => {
  //       this.database = db;
  //       resolve(db)
  //       db.executeSql("CREATE TABLE IF NOT EXISTS  RememberAccount (Id INTEGER PRIMARY KEY autoincrement, user TEXT, pass TEXT, checked boolean, autologin boolean)", []);
  //       db.executeSql("CREATE TABLE IF NOT EXISTS  Player(player_id TEXT PRIMARY KEY )", []);
  //       db.executeSql("CREATE TABLE IF NOT EXISTS  Token(user_token TEXT PRIMARY KEY )", []);
  //       db.executeSql("CREATE TABLE IF NOT EXISTS  Thongbao (id_tb TEXT PRIMARY KEY, tieude_tb TEXT, noidung_tb TEXT, trangthai_tb boolean,tg_gui TEXT, id_hp TEXT )", []);
  //     })
  //     .catch((error) =>alert('loi toa bang'+error)); 
  //   }) 
  // // }
  // putUser(username : string, password : string, checked : boolean, autologin : boolean )
  // {
  //   if (checked) {
  //     this.AddDataByQuery(username, password, checked, autologin).then((data)=>{
  //       return data
  //     },(error) =>{return error})
  //   }
  //   else {
  //     this.AddDataByQuery(null, null, checked, autologin).then((data)=>{
  //       return data
  //     },(error) =>{return error})
  //   }
  // }



  // AddDataByQuery(username, password, checked,autologin)
  // {
  //   this.DeleteRemember();
  //   return new Promise((resolve, reject) => {
  //     this.database.executeSql("INSERT INTO RememberAccount (user, pass, checked, autologin) VALUES(?,?,?,?)",
  //     [username,password,checked, autologin]).then((data) => {
  //       console.log(" thêm data success");
  //       resolve(data);
  //     }, (err) => {
  //       console.log(" thêm  data lỗi:", JSON.stringify(err));
  //       reject(err);
  //     });
  //   });
  // }

  // DeleteRemember()
  // {
  //   return new Promise((resolve, reject) => {
  //     this.database.executeSql("DELETE FROM RememberAccount", []).then(() => {
  //       console.log("Data xoa RememberAccount");
  //     }, (error) => {
  //       reject(error);
  //     });
  //   });
  // }
}
