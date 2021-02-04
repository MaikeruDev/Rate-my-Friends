import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ScoreboardPageModule } from '../scoreboard/scoreboard.module';
import { ScoreboardPage } from '../scoreboard/scoreboard.page';
import { RateFriendPageModule } from './rate-friend.module';

@Component({
  selector: 'app-rate-friend',
  templateUrl: './rate-friend.page.html',
  styleUrls: ['./rate-friend.page.scss'],
})
export class RateFriendPage implements OnInit {

  @Input()
  friendName: any = "soos";
  friendId: any = 2145;
  friendMail;

  rating: number;
  message: string = "";
  anonMessage: boolean = false;
  vid: any;
  responseCont: boolean;
  newNum: number;
  ratingTotal: number = 0;
  ratingCounter: number = 0;
  ratingAvg: number = 0;

  constructor(public sbPage: ScoreboardPage, public alertController: AlertController, public modalController: ModalController, public db: AngularFirestore, public afAuth: AngularFireAuth, private afStorage: AngularFireStorage, public navCtrl: NavController, public router: Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(async user=>{

      var visitorRef = this.db.collection("IDs").doc(user.email);

      await visitorRef.get().toPromise().then(async (doc: any) => {
        if (doc.exists) {
            this.vid = doc.data().id;
        }
      })

    })
  }

  async sendRating(){
    this.newNum = +this.rating;

    if(this.newNum == 1 || this.newNum == 2 || this.newNum == 3 || this.newNum == 4 || this.newNum == 5){
      
    await this.warningCont();

    await this.repsonsePrev();

      if(this.responseCont == true){

        await this.afAuth.authState.subscribe(async user=>{

          var docRef2 = this.db.collection("IDs").doc(this.friendMail).collection("ratings").doc(user.email);
          await docRef2.set({
            name: user.displayName,
            id: this.vid,
            rated: this.newNum,
            message: this.message,
            anon: this.anonMessage
          })

          var getRatings = this.db.collection("IDs").doc(this.friendMail).collection("ratings");
          await getRatings.get().toPromise().then(async ratings => {
            await ratings.forEach(async (rating: any) => {
              this.ratingTotal += rating.data().rated;
              this.ratingCounter++;
            });
            await this.calc();
            var docRef = this.db.collection("IDs").doc(this.friendMail);
            docRef.update({
              averageRating: this.ratingAvg
            })
            this.delay(2000)
            this.sbPage.reload();
          })
          
        })
      }
    }
    else{
      this.inputFailed();
    }
    this.closeModal();
  }

  async calc(){
    this.ratingAvg = this.ratingTotal / this.ratingCounter;
  }

  async repsonsePrev(){
    do {
      await this.delay(1000);
    } while (this.responseCont == undefined);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async inputFailed() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      subHeader: 'We could not send your Rating',
      message: 'Please re-check your input.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async warningCont(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      subHeader: 'You might already have rated this friend.',
      message: 'If you did, your last rating will be replaced with this one!',
      buttons: [ 
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.responseCont = false
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.responseCont =  true;
          }
        }
      ]
    });

    await alert.present();
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
