import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pipe, PipeTransform } from '@angular/core';
import { ProfileFriendPage } from '../profile-friend/profile-friend.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class ScoreboardPage implements OnInit {
  ratingAvgFinal: any;
  friends: any[] = [];

  constructor(public modalController: ModalController, public afAuth: AngularFireAuth, public db: AngularFirestore) { }

  async ngOnInit() {
    this.afAuth.authState.subscribe(async user=>{
      this.db.collection('IDs/' + user.email + "/friends").ref.where("accepted","==",true).where("addedBack","==",true).get().then(snap => {
        snap.forEach(async (friend: any) => {
          this.db.collection("IDs").doc(friend.id).ref.onSnapshot(async (querySnapshot: any) => {
          this.friends.push(querySnapshot);
          this.friends.sort((a, b) => (a.data().averageRating < b.data().averageRating) ? 1 : -1)
          });
        })
      });
    })
  }

  async reload(){
    location.reload();
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
        friendMail: femail,
        rateAllowed: true
      }
    });

    //this.deleteEntry(entry);
    return await modal.present();
  }

}
