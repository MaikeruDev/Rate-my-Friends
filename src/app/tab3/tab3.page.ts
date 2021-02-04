import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ProfileFriendPage } from '../profile-friend/profile-friend.page';

export interface IDs {
  name: string;
  id: number;
  profilePic: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit{
  
  username: any;
  id: any
  profilePic: any;
  joined: Date;
  size: any;
  ratings: any[] = [];
  ratingAvg: number = 0;
  ratingAvgCounter: number = 0;
  ratingAvgFinal: number = 0;

  constructor(public modalController: ModalController, public db: AngularFirestore, public afAuth: AngularFireAuth, private afStorage: AngularFireStorage, public navCtrl: NavController, public router: Router) {}

  async ngOnInit(){
    this.profilePic = "";
    await this.getData();
  }

  async getData(){
    this.afAuth.authState.subscribe(async user=>{
      

      var docRef = this.db.collection("IDs").doc(user.email);

      this.username = "";
      this.id = "";
      this.profilePic = "";

      docRef.ref.onSnapshot(async (doc: any) => {
        if (doc.exists) {
            this.username = doc.data().name;
            this.id = doc.data().id;
            this.joined = doc.data().joined.toDate()
            this.profilePic = doc.data().profilePic;
        }
      })

      

      this.db.collection("IDs").doc(user.email).collection("ratings").get().toPromise().then(async querySnapshot => {
        this.ratings = [];
        this.ratingAvg = 0;
        this.ratingAvgCounter = 0;
        querySnapshot.forEach(async (doc: any) => {
            this.ratings.push(doc);
            this.ratingAvg += doc.data().rated;
            this.ratingAvgCounter++;
        });

        this.db.collection("IDs").doc(user.email).ref.onSnapshot(async (querySnapshot: any) => {
          this.ratingAvgFinal = querySnapshot.data().averageRating;
        });
        
    });

      this.db.collection('IDs/' + user.email + "/friends").ref.where("accepted","==",true).where("addedBack","==",true).get().then(snap => {
        this.size = snap.size;
     });


    })
  }

  async friendModal(username: any, id: any, email: any){

    var fname = username;
    var fid = id;
    var femail = email;

    const modal = await this.modalController.create({
      component: ProfileFriendPage,
      componentProps: {
        friendName: fname,
        friendId: fid,
        friendMail: femail
      }
    });

    //this.deleteEntry(entry);
    return await modal.present();
  }

  openSettings(){
    this.router.navigateByUrl("user-settings");
  }

}
