import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { RateFriendPageModule } from '../rate-friend/rate-friend.module';
import { RateFriendPage } from '../rate-friend/rate-friend.page';

export interface IDs {
  name: string;
  id: number;
  profilePic: string;
}

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.page.html',
  styleUrls: ['./profile-friend.page.scss'],
})

export class ProfileFriendPage implements OnInit {
 
  @Input()
  friendName;
  friendId;
  friendMail;
  rateAllowed;

  username: any;
  id: any
  profilePic: any;
  joined: Date;
  size: any;
  ratings: any[] = [];
  ratingAvg: number = 0;
  ratingAvgCounter: number = 0;
  ratingAvgFinal: number = 0;
  vusername: any;
  vid: number;
  vjoined: any;
  vprofilePic: any;
  showRatingBtn: boolean;

  constructor(public modalController: ModalController, public db: AngularFirestore, public afAuth: AngularFireAuth, private afStorage: AngularFireStorage, public navCtrl: NavController, public router: Router) {}


  async ngOnInit(){
    await this.getData();
    this.showRatingBtn = this.rateAllowed;
  }


  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
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

  async getData(){
    this.afAuth.authState.subscribe(async user=>{
      

      var docRef = this.db.collection("IDs").doc(this.friendMail);
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

      var visitorRef = this.db.collection("IDs").doc(user.email);

      visitorRef.ref.onSnapshot(async (doc: any) => {
        if (doc.exists) {
            this.vusername = doc.data().name;
            this.vid = doc.data().id;
        }
      })


      this.db.collection("IDs").doc(this.friendMail).collection("ratings").ref.onSnapshot(async querySnapshot => {
        this.ratings = [];
            this.ratingAvg = 0;
            this.ratingAvgCounter = 0;
        querySnapshot.forEach(async (doc: any) => {
            this.ratings.push(doc);
            this.ratingAvg += doc.data().rated;
            this.ratingAvgCounter++;
        });
        
    this.ratingAvgFinal = this.ratingAvg / this.ratingAvgCounter;
    });

      this.db.collection('IDs/' + this.friendMail + "/friends").ref.onSnapshot(snap => {
        this.size = snap.size;

        this.db.collection("IDs").doc(this.friendMail).collection("friends").ref.where("name", "==", user.displayName).where("id", "==", this.vid).where("accepted", "==", true).where("addedBack", "==", true)
    .get()
    .then(async (querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          this.showRatingBtn = true;
        });
    })
    .catch(async (error) => {
        console.log("Error getting documents: ");
    });
    })
    })
  }

  async openRating() {
    const modal = await this.modalController.create({
      component: RateFriendPage,
      componentProps: {
        friendId: this.friendId,
        friendMail: this.friendMail,
        friendName: this.friendName
      }
    });

    return await modal.present();
  }

}
