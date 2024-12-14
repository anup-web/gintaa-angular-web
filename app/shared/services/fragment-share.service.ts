import { ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface elementRefObj {
  fragmentType: string,
  componentRefVariableName: string
}

@Injectable({
  providedIn: 'root'
})
export class FragmentShareService {
 
  public static eleRefArr: Array<elementRefObj> = [];
  public static currentFragment: string;
  constructor() { }

  registerFragments(input: Array<elementRefObj>){
    let finalArr = [];
    finalArr = FragmentShareService.eleRefArr = [...FragmentShareService.eleRefArr, ...input];
    FragmentShareService.eleRefArr = Array.from(new Set(finalArr.map((a: elementRefObj) => a.fragmentType)))
      .map(id => {
        return FragmentShareService.eleRefArr.find((a: elementRefObj) => a.fragmentType === id)
      })
    // FragmentShareService.eleRefArr = [...FragmentShareService.eleRefArr, ...input]
    // FragmentShareService.eleRefArr = [...new Set(FragmentShareService.eleRefArr)] as any;
    // for(let i=0;i<input.length;i++){
    //   let isElementExist = true;
    //   const findObj = FragmentShareService.eleRefArr.find((element)=>{
    //     if(!element){
    //       isElementExist = false;
    //       return false;
    //     }
    //     return element.fragmentType === input[i].fragmentType;
    //   })
    //   if(!findObj && isElementExist){
    //     FragmentShareService.eleRefArr.push(findObj);
    //   } 
    // }
  }

  currentFragment(fragmentType: string){
    FragmentShareService.currentFragment = fragmentType;    
  }

  goBackToSectionWithFragment(){
    const that: any = this;
    let currentFragmentType = FragmentShareService.currentFragment;
    that.route.fragment.subscribe((fragment)=>{
      FragmentShareService.currentFragment = currentFragmentType = fragment;
    })
    setTimeout(()=>{
      const refEleFragment: elementRefObj = FragmentShareService.eleRefArr.find((item: elementRefObj)=>{
        return item.fragmentType === currentFragmentType;
      })
      if(refEleFragment){
        that[refEleFragment.componentRefVariableName].nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    },2000)
  }
}
