import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TagsSeo } from '../models';
import { SocialShareConstants as Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TitleTagService {

  constructor(private meta:Meta, private title:Title) { }

  public setTitle(title: string): void {
    this.title.setTitle(title);
  }

  public setSeo(data: TagsSeo) {
    //const tags: { name: string; content: string }[] = [];
    const tags: any[] = [];
    if (data.title) {
      this.title.setTitle(data.title);
      tags.push({ property: Constants.FB_TITLE, content: data.title });
      tags.push({ name: Constants.TWITTER_TITLE, content: data.title });
      // tags.push({ name: Constants.TITLE, content: data.title });
    }
    if (data.description) {
      // tags.push({ name: Constants.DESC, content: data.description });
      tags.push({ property: Constants.FB_DESC, content: data.description });
      tags.push({ name: Constants.TWITTER_DESC, content: data.description });
    }
    if (data.image) {
      tags.push({ property: Constants.FB_IMAGE, content: data.image });
      tags.push({ name: Constants.TWITTER_IMAGE, content: data.image });
      tags.push({ property: Constants.FB_IMAGE_WIDTH, content: Constants.IMAGE_WIDTH });
      tags.push({ property: Constants.FB_IMAGE_HEIGHT, content: Constants.IMAGE_HEIGHT });
    }
    // if (data.url) {
    //   tags.push({ property: 'og:url', content: data.url });
    // }
    const siteName = data.site_name || 'GINTAA';
    tags.push({ property: Constants.FB_SITE_NAME, content: siteName });
    tags.push({ name: Constants.TWITTER_SITE_NAME, content: siteName });
    const type: string = data.type || 'WEBSITE';
    tags.push({ property: Constants.FB_TYPE, content: type });
    // console.log('Final Tags:::', tags);
    //this.meta.addTags(tags);
    for (const tag of tags) {
      // this.meta.updateTag(tag);
      this.meta.addTag(tag);
    }
  }

  public removeSeo(): boolean { 
      this.title.setTitle('GINTAA');
      this.meta.removeTag(`name='${Constants.TWITTER_TITLE}'`);
      this.meta.removeTag(`name='${Constants.TWITTER_IMAGE}'`);
      this.meta.removeTag(`name='${Constants.TWITTER_DESC}'`);
      this.meta.removeTag(`name='${Constants.TWITTER_SITE_NAME}'`);
      this.meta.removeTag(`property='${Constants.FB_TITLE}'`);
      this.meta.removeTag(`property='${Constants.FB_IMAGE}'`);
      this.meta.removeTag(`property='${Constants.FB_DESC}'`);
      this.meta.removeTag(`property='${Constants.FB_SITE_NAME}'`);
      this.meta.removeTag(`property='${Constants.FB_IMAGE_WIDTH}'`);
      this.meta.removeTag(`property='${Constants.FB_IMAGE_HEIGHT}'`);
      this.meta.removeTag(`property='${Constants.FB_TYPE}'`);
      return true;
  }
}
