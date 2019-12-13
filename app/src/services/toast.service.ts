import { Injectable } from '@angular/core';
import { ToastController } from "@ionic/angular";

@Injectable()
export class ToastService{
    toast: any = null;

    constructor(public toastCtrl: ToastController){ }

    presentToast(text: string): void{
        let toastData = {
            message: text,
            duration: 3000,
        };

        this.showToast(toastData);
    }


    private async showToast(data:any){
        this.toast ? this.toast.dismiss() : false;
        this.toast = await this.toastCtrl.create(data);
        return await this.toast.present();
    }
}
