import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {

  expensesCollection: AngularFirestoreCollection<unknown>;
  id: any;

  constructor(public tab2: Tab2Page, public alertController: AlertController, private modalController: ModalController, public afAuth: AngularFireAuth, public db: AngularFirestore) { }

  ngOnInit() {
  }

  input: string;
  dbv: AngularFirestoreCollection;
  getNumb: number;

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  async addPlayer(){
    var getNameCutPos = this.input.indexOf('#');
    var getName = this.input.substring(0, getNameCutPos);
    var getNum = this.input.substring(getNameCutPos + 1);
    var Num: number = +getNum;

    this.db.collection("IDs").ref.where("name", "==", getName).where("id", "==", Num)
    .get()
    .then(async (querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
            this.afAuth.authState.subscribe(async user=>{
              var docRef = this.db.collection("IDs").doc(user.email).collection("friends").doc(doc.id);
              docRef.set({
                name: getName,
                id: Num,
                addedBack: false,
                accepted: false
              })

              var docRefID = this.db.collection("IDs").doc(user.email);

              await docRefID.get().toPromise().then(async (doc: any) => {
                if (doc.exists) {
                    this.id = doc.data().id;
                }
              })

              var docRef2 = this.db.collection("IDs").doc(doc.id).collection("friends").doc(user.email);
              docRef2.set({
                name: user.displayName,
                id: this.id,
                addedBack: false,
                accepted: true
              })
            })
        });
    })
    
    this.closeModal();
  }

}
