import { Component } from '@angular/core';
import { PushService } from '../services/push.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private pushService: PushService) {
    pushService.init();
  }

}
