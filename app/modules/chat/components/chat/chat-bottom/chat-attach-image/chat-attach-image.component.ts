import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoggerService } from '@gintaa/core/services';;
import uid from 'uid';

@Component({
  selector: 'app-chat-attach-image',
  templateUrl: './chat-attach-image.component.html',
  styleUrls: ['./chat-attach-image.component.scss']
})
export class ChatAttachImageComponent implements OnInit {

  // Pagination
  totalImageCount = 0;
  // Output
  images: any = [];
  videos: any = [];
  mode: string = null;
  isVideo = false;
  viewFileIndex = 0;
  @ViewChild('message',{ static: false}) message: any;

  constructor(
    public dialogRef: MatDialogRef<ChatAttachImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    const files: any = this.data.files;
    this.mode = this.data.name
    this.isVideo = this.data.isVideo;
    this.totalImageCount = files.length;
    if(this.mode === 'view') {
      this.chatImageView(files, this.isVideo);
    } else {
      this.chatImagePreview(files);
    }
  }

  chatImageView(files: string[], isVideo: boolean) {
    if(!isVideo) {
      this.images = files.map((file: string) => ({
        url: file,
        type: 'image'
      }))
    }
    else {
      this.videos = [...files.map((file: string) => ({
        url: file,
        type: 'video'
      }))] 
    }
  }

  chatImagePreview(files) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = file.type.split('.').pop().toLowerCase();
        const fileName = file.name;
        this.logger.log({
          message:`File ::: name: ${fileName}, type: ${fileType}`
        });
        const obj = {
          file,
          name: fileName,
          type: fileType,
          id: uid()
        };
        // File Preview
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (event) => {
          obj['url'] = this.isVideo ? (<FileReader>event.target).result : reader.result as string;
        }  
        if(this.isVideo) {
          this.videos.push(obj);
        } else {
          this.images.push(obj);
        }
      }
    }
  }

  sendChatImages() {
    const files = this.isVideo ? [...this.videos] : [...this.images];
    const res = { status: 3, files, msg:  this.message.nativeElement.value };
    this.dialogRef.close(res);
  }

  removeChatMedia(media: any, index: number, isVideo?: boolean, mode?: string) {   
    //const indexEle = this.images.indexOf(media);
    if(this.mode !== 'view') {
      if(isVideo) {
        this.videos = this.videos.filter(item => item.id !== media.id);
        if(this.videos.length ==0){
          this.cancel();
        }
      } else {
        this.images = this.images.filter(item => item.id !== media.id);
        if(this.images.length ==0){
          this.cancel();
        }
      }
    }
    
  }

  cancel() {
    this.dialogRef.close({closeImagePopUp: true});
  } 

}
