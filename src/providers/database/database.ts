import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { table } from '../../object/object';

@Injectable()
export class DatabaseProvider {
public database :SQLiteObject;
constructor(  public storage: SQLite) {}

createTbale()
{
  return new Promise((resolve, reject)=>{
    this.storage.create(
      {  name : "nearbyvn.db",
    location : "default"}) 
    .then((db : SQLiteObject) => {
      this.database = db;
      resolve(db)
      let query = `CREATE TABLE IF NOT EXISTS  
          Account (Id INTEGER PRIMARY KEY autoincrement,user_token TEXT, id_member INTEGER)`;
      db.executeSql(query, []);
    })
    .catch((error) =>reject('loi toa bang'+error)); 
  }) 
}

 async putUser( id_member,user_token)
  {
    await this.Delete("DELETE FROM Account");
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO Account (user_token, id_member) VALUES(?,?)";
      let values = [user_token, id_member];
      this.Insert(query,values).then((data) => {
           console.log(" putUser thanh cong");
            resolve(data);
      }, (err) => {
            console.log(" putUser lỗi:", err);
            reject(err);
      });
    });
  }
  getUser()
  {
    return new Promise((resolve, reject) => {
      this.database.executeSql("SELECT * FROM Account", []).then((data) => {
      if (data.rows.length < 1) {
        resolve(false) 
      } 
        resolve(data.rows.item(0).user_token);
    },
      (error) => reject(error+"getUser"));
    });
  }
 
// cac ham query dung tom gon
  Delete(query:string)
  {
    return this.database.executeSql(query, []);
  }
  Select(query:string)
  {
    return this.database.executeSql(query, []);
  }
  Insert(query:string,values:any[])
  {
      return this.database.executeSql(query, values);
  }
  Update(query:string,values:any[])
  {
      return this.database.executeSql(query, values);
  }

}
