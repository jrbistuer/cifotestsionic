import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private userService: UserService) { }

  init() {
    this.registerNotifications();
    this.addListeners();
    this.getDeliveredNotifications();
  }

  async addListeners() {
    await PushNotifications.addListener('registration', token => {
      console.info('METAG Registration token: ', token.value);
      this.userService.updateUserToken(token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('METAG Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('METAG Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('METAG Push notification action performed', notification.actionId, notification.inputValue);
    });
  }
  
  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  }
  
  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

}
