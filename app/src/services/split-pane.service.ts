import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';


@Injectable()
export class SplitPaneService {
  splitPaneState: boolean;
  constructor(public platform: Platform) {
    this.splitPaneState = false;
  }

  getSplitPane() {
    if (localStorage.getItem('currentUser')) {
      this.splitPaneState = this.platform.width() > 900;
    }
    return this.splitPaneState;
  }
}
