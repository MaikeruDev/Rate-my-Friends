import { ResourceLoader } from '@angular/compiler';
import { fn } from '@angular/compiler/src/output/output_ast';
import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { AddPlayerPage } from '../add-player/add-player.page';
import { ProfileFriendPage } from '../profile-friend/profile-friend.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
@Injectable({
  providedIn: 'root'
})
export class Tab2Page implements OnInit {
  dataReturned: any;

  constructor(public alertController: AlertController, private modalController: ModalController, public afAuth: AngularFireAuth, public db: AngularFirestore) {}

  safeFriends: any[] = [];
  sentFriends: any[] = [];
  reqFriends: any[] = [];

  async ngOnInit(){
    this.afAuth.authState.subscribe(async user=>{
      this.db.collection('IDs/' + user.email + "/friends").ref.onSnapshot(snap => {
        this.safeFriends = [];
        this.sentFriends = [];
        this.reqFriends = [];
        snap.forEach(async (doc: any) => {
          if(doc.data().addedBack == true){
            this.safeFriends.push(doc);
          }
          else if(doc.data().accepted == false){
            this.sentFriends.push(doc);
          }
          else{
            this.reqFriends.push(doc);
          }
        });
      });
    })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async removeFriend(usermail: any){
    this.afAuth.authState.subscribe(async user=>{

      this.db.collection("IDs").doc(user.email).collection("friends").doc(usermail.id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

    this.db.collection("IDs").doc(usermail.id).collection("friends").doc(user.email).delete().then(async () => {
      this.reloadFriends();
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

    })
  }

  async presentAlert(name: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'You have to wait for ' + name + ' to accept your friend request.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddPlayerPage,
      cssClass: 'add-player',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        
      }
    });

    return await modal.present();
  }

  reloadFriends(){
    this.delay(1000);
    this.reqFriends = [];
    this.sentFriends = [];
    this.safeFriends = [];
    this.ngOnInit();
  }

  acceptFriend(usermail){
    this.afAuth.authState.subscribe(async user=>{

      await this.db.collection("IDs").doc(user.email).collection("friends").doc(usermail.id).update({
        addedBack: true
      })
      .then(async () => {
        this.reloadFriends();
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

      await this.db.collection("IDs").doc(usermail.id).collection("friends").doc(user.email).update({
        accepted: true,
        addedBack: true
      })
      .then(async () => {
        this.reloadFriends();
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

    })
  }

  declineFriend(usermail){
    this.afAuth.authState.subscribe(async user=>{

      await this.db.collection("IDs").doc(user.email).collection("friends").doc(usermail.id).update({
        addedBack: false
      })
      .then(async () => {
        this.reloadFriends();
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

      await this.db.collection("IDs").doc(usermail.id).collection("friends").doc(user.email).update({
        accepted: true,
        addedBack: true
      })
      .then(async () => {
        this.reloadFriends();
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
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


}
