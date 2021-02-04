import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {

  curruserName: string;
  curruserMail: string;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore, public router: Router) {
   }
 
  ngOnInit() {
    
  }

  async getData(){
    
    this.afAuth.authState.subscribe(async user=>{
      if(user)
      
      var docRef = this.db.collection("IDs").doc(user.email);

      docRef.get().toPromise().then(function(doc) {
        if (doc.exists) {
            console.log("user already exists")
        } else {
            docRef.set({
              name: user.displayName,
              id: Math.floor(Math.random() * 9000) + 999,
              profilePic: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
              joined: new Date()
            });
        }
      })     
    })
  }

  async success(){
    await this.getData();
    this.router.navigateByUrl("tabs");
  }

  getRandomInt() {
    return Math.floor(Math.random() * 9000) + 999 ;
  }

}
