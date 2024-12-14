import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FcmService } from '@gintaa/core/services/fcm.service';
import { NotiFicationTypes } from '../../config/notification.enum';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  notificationTypes = NotiFicationTypes;
  notificationList: Array<any> = [];
  notiOffset: number = 0;
  notiPageLimit: number = 5;
  unreadNotiCount: number = 0;
  unreadNotiData: Array<any> = [];
  constructor(private notificationService: NotificationService,
    private fcmService: FcmService) { }

  ngOnInit(): void {
    this.getReadNotificationSubscrbe();
    this.getNotifications();
  }

  onScroll(){
      // console.log('scroll down!!');
      //this.paginatedData.emit(1);
  }

  onReadNotification(event){

  }

  getReadNotificationSubscrbe(){
    this.notificationService.notificationReadEvent$.subscribe((data)=>{
        // console.log(data);
        this.notificationList.map((item)=>{
           if(item.notificationId === data.notificationId){
             item.isRead = true;
           }
        })
    })
  }

  markAllAsRead(){
    //this.childMarkAllAsRead.emit();
  }

  getNotifications(){
    this.fcmService.getAllNotifications(this.notiPageLimit, this.notiOffset).subscribe((data: any)=>{
        this.notificationList = data;
        // console.log("Notification List is", this.notificationList);
    }, (error)=>{
      // console.log(error);
    })

    this.notificationService.notificationReadEvent$.subscribe((data)=>{
      // console.log(data);
      this.notificationList.map((item)=>{
         if(item.notificationId === data.notificationId){
           item.isRead = true;
          
         }
      })
      this.unreadNotiCount = this.notificationList.filter(item=> !item.isRead).length;
    })

  }
  
  getNotificationCount(){
    this.fcmService.getAllNotificationUnreadCount().subscribe((data: any)=>{
      this.unreadNotiData = data.payload;
      this.unreadNotiCount = this.unreadNotiData.filter(item=> !item.isRead).length;
    })
  }

  getPaginatedData(event){
    this.notiOffset++;
    this.getNotifications();
  }

  callFcmPushNoti(){
    this.fcmService.realTimeMessages.subscribe((message)=>{
        this.notificationList.splice(0,0,message);
        this.unreadNotiCount++;
    })
  }

}
