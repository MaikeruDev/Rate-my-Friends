import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {
  username: any;
  id: any;
  joined: any;
  profilePic: any;
  picSelect: any;

  constructor(public modalController: ModalController, public alertController: AlertController, public db: AngularFirestore, public afAuth: AngularFireAuth, private afStorage: AngularFireStorage, public navCtrl: NavController, public router: Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(async user=>{

      var docRef = this.db.collection("IDs").doc(user.email);

      docRef.get().toPromise().then(async (doc: any) => {
        if (doc.exists) {
            this.username = doc.data().name;
            this.id = doc.data().id;
            this.joined = doc.data().joined.toDate()
            this.profilePic = doc.data().profilePic;
        }
      })
    })
  }

  backToProfile(){
    this.router.navigateByUrl("tabs/tab3")
  }

  signOut(){
    this.afAuth.signOut();
    this.router.navigateByUrl("login")
    location.reload();
  }

  saveChanges(){
    if(this.picSelect == undefined){
      this.presentAlert();
    }
    else{
      this.afAuth.authState.subscribe(async user=>{

        await this.db.collection("IDs").doc(user.email).update({
          profilePic: "https://firebasestorage.googleapis.com/v0/b/rate-my-friends.appspot.com/o/" + this.picSelect + ".jpg?alt=media&token=afb0a426-e959-4313-85e4-b78b7db31b13"
        })
        .then(async () => {
          this.router.navigateByUrl("tabs/tab3");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
      })
      
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      message: 'You have to select one of the pictures!',
      buttons: ['OK']
    });

    await alert.present();
  }

}
