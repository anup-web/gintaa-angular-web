import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FirebaseRemotConfigParameterEnum } from '@gintaa/config/enum.config';
import { environment } from '@gintaa/env';
import { json } from 'express';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStaticContentService {
  
  public staticContentKey = 'static_content';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    
    private storageService: StorageService,
  ) { }

  updateLatestValueInLocalStore(parameterKey, parameterValue) {
    let currentValue            = this.storageService.getData(this.staticContentKey);
    let currentValObj           = currentValue ? JSON.parse(currentValue) : {};
    currentValObj[parameterKey] = parameterValue;
    let updatedValString        = JSON.stringify(currentValObj);
    // console.log('updatedValString:', currentValObj);
    this.storageService.storeData(this.staticContentKey, updatedValString);
  }

  getStaticContentFromStore(parameterKey: string) {    
    let currentValue            = this.storageService.getData(this.staticContentKey);
    let currentValObj: any      = currentValue ? JSON.parse(currentValue) : null;
    return (currentValObj && currentValObj[parameterKey]) ? currentValObj[parameterKey] : null;
  }

  async getDataFromRemotConfig(parameterKey: string = '') {
    if(isPlatformBrowser(this.platformId) && parameterKey) {
      const remoteConfig = firebase.remoteConfig();
      remoteConfig.settings.minimumFetchIntervalMillis = environment.remotConfig_minimumFetchIntervalMillis // 36; //3600000;
      await remoteConfig.fetchAndActivate();
      const parameterValues = await remoteConfig.getValue(parameterKey);
      const parameterValueObj = (parameterValues && parameterValues['_value']) ? JSON.parse(parameterValues['_value']) : [];
      // console.log('bannerList parameterValue:', parameterValueObj);
      this.updateLatestValueInLocalStore(parameterKey, parameterValueObj);
      return parameterValueObj;
    }
    return false;
  }

  
  async getBanners() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeBanners; //'web_home_banners';
    let bannerData = this.getStaticContentFromStore(parameterKey);
    if(!bannerData) {
      bannerData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }    
    return bannerData;
  }

  async getPopularCategories() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homePopularCategory; //'web_home_popularCategory';
    let categoriData = this.getStaticContentFromStore(parameterKey);
    if(!categoriData) {
      categoriData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    return categoriData;
  }

  async getTopBrands() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeTopBrands; //'web_home_top_brands';
    let topBrandsData = this.getStaticContentFromStore(parameterKey);
    if(!topBrandsData) {
      topBrandsData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    
    return topBrandsData;
  }



  async getOfferCategory() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeOfferCategories; //'web_home_offer_categories';
    let offerCategoryData = this.getStaticContentFromStore(parameterKey);
    if(!offerCategoryData) {
      offerCategoryData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    return offerCategoryData;
  }

  async getBottomBanners() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeBottomBanners; //'web_home_bottom_banners';
    let bottomBannersData = this.getStaticContentFromStore(parameterKey);
    if(!bottomBannersData) {
      bottomBannersData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    return bottomBannersData;
  }

  async getBuyNewProducts() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeBuyNewProducts; //'web_home_buy_new_products';
    let newProductData = this.getStaticContentFromStore(parameterKey);
    if(!newProductData) {
      newProductData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
     return newProductData;
  }
  
  async getPromotionalBanners() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homePromotionalBanners; //'web_home_promotional_banners';
    let bannersData = this.getStaticContentFromStore(parameterKey);
    if(!bannersData) {
      bannersData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    return bannersData;
  }
  
  async getBusinessBanners() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeBusinessBanners; //'web_home_business_banners';
    let bannersData = this.getStaticContentFromStore(parameterKey);
    if(!bannersData) {
      bannersData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    return bannersData;
  }
  
  async getFooterDownloadOurApp() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeFooterDownloadOurApp; //'web_home_footer_download_our_app';
    let bannersData = this.getStaticContentFromStore(parameterKey);
    if(!bannersData) {
      bannersData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    return bannersData;
  }
  
  async getAuctionBanners() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeAuctionBanners; //'web_home_auction_banners';
    let bannersData = this.getStaticContentFromStore(parameterKey);
    if(!bannersData) {      
      bannersData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    return bannersData;
  }
  
  async getLastViewedOfferBanners() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeLastViewedListing; //'web_home_last_viewed_offers';
    let bannersData = this.getStaticContentFromStore(parameterKey);
    if(!bannersData) {
      bannersData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    
    return bannersData;
  }
  
  async getSocialBanners() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeSocialBanner; //'web_home_social_banner';
    let bannersData = this.getStaticContentFromStore(parameterKey);
    if(!bannersData) {
      bannersData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }
    return bannersData;
  }
  
  async getAppPromotionalBanners() {
    let parameterKey = FirebaseRemotConfigParameterEnum.homeAppPromotionalBanners; //'web_home_app_promotional_banners';
    let bannersData = this.getStaticContentFromStore(parameterKey);
    if(!bannersData) {      
      bannersData = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }

    return bannersData;
  }
  
  async getCountryList() {
    let parameterKey = FirebaseRemotConfigParameterEnum.countryList; //'country_list';
    let data = this.getStaticContentFromStore(parameterKey);
    if(!data) {      
      data = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }

    return data;
  }
  
  async getPhaseWiseFeatureRelease() {
    let parameterKey = FirebaseRemotConfigParameterEnum.phaseWiseFeatureRelease; //'web_phase_wise_feature_release';
    let data = this.getStaticContentFromStore(parameterKey);
    if(!data) {      
      data = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }

    return data;
  }

  async isFeatureRelease(featureName: string) {
    if(featureName) {  
      let currentphase = environment.currentPhase;
      if(currentphase) {        
        let phaseWiseFeatures = await this.getPhaseWiseFeatureRelease();
        // console.log('featureName:', featureName);
        // console.log('featureName:', currentphase);
        // console.log('featureName:', phaseWiseFeatures[currentphase][featureName]);
        // return (phaseWiseFeatures[currentphase] && phaseWiseFeatures[currentphase][featureName]) ? phaseWiseFeatures[currentphase][featureName] : false;
        return phaseWiseFeatures[currentphase] && phaseWiseFeatures[currentphase][featureName];
      }
    }
    return false;
  }

  async isEnableAuction() {
    let parameterKey = FirebaseRemotConfigParameterEnum.enableAuction; //'enable_auction';
    let data = this.getStaticContentFromStore(parameterKey);
    if(!data) {      
      data = await this.getDataFromRemotConfig(parameterKey);
    } else {
      this.getDataFromRemotConfig(parameterKey);
    }

    return data;
  }

}
