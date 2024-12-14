import { Injectable } from '@angular/core';
import { Search } from '@gintaa/core/models/Search';
import { SearchResponse } from '@gintaa/core/models/SearchResponse';
import { SearchService } from '@gintaa/core/services/search.service';
import { environment } from '@gintaa/env';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CategoryConstants } from '../constants/category.constant';

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    private category: BehaviorSubject<SearchResponse> = new BehaviorSubject<SearchResponse>(null);

    categoryDetails$: Observable<SearchResponse> = this.category.asObservable();

    private selectedCategory: Subject<string> = new Subject<string>();

    selectedCategoryLists$: Observable<string> = this.selectedCategory.asObservable();

    private searchValueChanged: Subject<string> = new Subject<string>();

    searchValueChanged$: Observable<string> = this.searchValueChanged.asObservable();
    
    clearSearchText: Subject<any> = new Subject<any>();

    queryParamLists: string[] = [];

    searchText: string = null;
    index = 1;
    private url: string = null;
    public searchResult: Search[] = [];
    private searchResultCount = 0;
    public minPrice: number = 0;
    public maxPrice: number = 0;
    private flrPrice: number = 0;
    private cilPrice: number = 0;
    private categoryId: string = null;

    public isLoading: boolean = false;

    constructor(
        private serachService: SearchService
    ) {   }

    categoryDetails(searchText: string, queryParams?: string, index?: number, pageSize?: number, categoryId?: string) {
        let url: string = null;
        if (index === 0) {
            index = this.getCurrentIndex();
        }         
        this.searchValueChanged.next(searchText); 
        url = this.getFullSearchUrl(searchText, queryParams, index, pageSize, categoryId);
        this.isLoading = true;
        this.serachService.getSearchFullText(url)
        .pipe(
            // tap(() => console.log('HTTP call executed')),
            // map((response: any) => this.customizeResponse(response)),
            map(
                (response: any) =>  {
                    return response['payload'] ?  
                    (
                        queryParams ? this.modifyResult(queryParams, response['payload']) 
                                : this.customizeResponseForPrice(response['payload'])
                    ) : null
                })
        ).subscribe(
            (result: SearchResponse) => {
                result.searchResult = result.searchResult.length && result.searchResult.map(obj => ({...obj, offerId: obj.oid}));
                // console.log('Result in categoryDetails subscribe category nooeoeoeo :::', result);
                // remove price attribute from primary facets
                result.primaryFacets = result.primaryFacets.length && result.primaryFacets.filter(obj => obj.key.toLowerCase() !== 'price');
                if(index === 1) {
                    this.searchResult.length = 0;
                }
                if(result.searchResult.length)
                this.searchResult.push(...result.searchResult);
                result.searchResult = this.searchResult;
                this.searchResultCount = result.count;
                this.setFloorPrice(result.minPrice);
                this.setCeilPrice(result.maxPrice);                
                this.category.next(result);
                this.isLoading = false;
            },
            (errorResponse) => {
                this.category.next(null);
                this.isLoading = false;
            }
        );
    }    

    getFullSearchUrl(searchText?: string, f?: string, index?: number, pageSize?: number, categoryId?: string) {
        let url: string = null;
        // searchText = searchText !== null ? true
        if (searchText) {
            url = f ? (
            index ? (
                    pageSize ?
                    `?q=${searchText}&f=${f}&page=${index - 1}&size=${pageSize}`
                    : `?q=${searchText}&f=${f}&page=${index - 1}`
                    )
                    :  `?q=${searchText}&f=${f}`
                    ) : (
            index ? (
                    pageSize ?
                        `?q=${searchText}&page=${index - 1}&size=${pageSize}`
                        : `?q=${searchText}&page=${index - 1}`
                    )
                    : `?q=${searchText}`
                    );
        } else {
            url = f ? (
                index ? (
                        pageSize ?
                        `?q=null&f=${f}&page=${index - 1}&size=${pageSize}`
                        : `?q=null&f=${f}&page=${index - 1}`
                        )
                        :  `?q=null&f=${f}`
                        ) : (
                index ? (
                        pageSize ?
                            `?q=null&page=${index - 1}&size=${pageSize}`
                            : `?q=null&page=${index - 1}`
                        )
                        : `?q=null`
                        )
        }
        if(this.leafNodeCategoryId) {
            url = `${url}&cid=${this.leafNodeCategoryId}`;
        }
        this.setCurrentUrl(url);
        return url;
    }

    addIndex() {
        // console.log('Tests:::::', this.getCurrentUrl());
        const url = new URL(`${environment.serverUrl}${this.getCurrentUrl()}`);
        const pageIndex: number = +url.searchParams.get('page');
        const search: string = url.searchParams.get('q');
        const queryParams: string = url.searchParams.get('f') ? encodeURI(url.searchParams.get('f')) : url.searchParams.get('f');
        this.index = pageIndex + 2;
        this.categoryDetails(search, queryParams, this.getCurrentIndex(), CategoryConstants.PAGE_SIZE);
    }

    getCurrentIndex() {
        return this.index;
    }

    setCurrentUrl(url: string) {
        this.url = url;
    }

    getCurrentUrl(): string {
        return this.url;
    }

    setCategoryId(catId: string = null) {
        this.categoryId = catId;
    }

    get leafNodeCategoryId(): string {
        return this.categoryId;
    }

    get paramList(): string[] {
        return this.queryParamLists;
    }

    clearParamList() {
        this.queryParamLists.length = 0;
    }

    addQueryParamList(value: string) {
        if (!this.queryParamLists.includes(value)) {
        this.queryParamLists.push(value);
        }
    }

    removeFromQueryParamList(value: string) {
        // console.log('param List intial:::', this.paramList);
        const index: number = +this.paramList.indexOf(value);
        if(index >=0) {
            this.queryParamLists.splice(index, 1);
        }
        // console.log('param List Final:::', this.queryParamLists);
    }

    removeOldPriceFromQueryParam() {
        // console.log('param List price:::', this.paramList);
        let searchStr: string = 'Price_';
        this.paramList.forEach((param: string, index: number) => {
            if(param.includes(searchStr)) {
                // const index: number = +this.paramList.indexOf(searchStr);
                this.queryParamLists.splice(index, 1);
            }
        });
        // console.log('queryParamLists send from price:::', this.queryParamLists);
    }

    getSearchText(): string {
        return this.searchText;
    }

    setSearchText(text: string) {
        this.searchText = text;
    }

    sendSelectedCategory() {  
        // this.searchResult.length = 0;      
        const search = this.getSearchText();
        this.index = 1;
        const searchParam = `${search}~${this.paramList.join(',')}`;
        this.selectedCategory.next(searchParam);
    }

    customizeResponse(response: any): any {
        let filteredArray = response.primaryFacets.filter((item) => item.key === 'Exchange Mode');
        if(filteredArray.length) {
            const categoryArr = response.primaryFacets.filter((item) => item.key !== 'Exchange Mode');
            response.primaryFacets.length = 0;
            response.primaryFacets = [...categoryArr, ...filteredArray];
        }
        return response;
    }

    customizeResponseForPrice(res: SearchResponse) {
        res = this.customizeResponse(res);        
        this.setInitialPrice(res.minPrice, res.maxPrice);
        return res;
    }

    setInitialPrice(min, max) {
        // console.log('Min value in setInitialPrice:::', min);
        // console.log('Max value in setInitialPrice:::', max);
        this.minPrice = min;
        this.maxPrice = max;
        this.flrPrice = min;
        this.cilPrice = max;
        if(min === max) {
            this.minPrice = 0;
        } 
        if(max === 0 && min === max) {
            this.maxPrice = 0;
        }
    }

    get priceMin() {
        return this.minPrice;
    }

    get priceMax() {
        return this.maxPrice;
    }

    setFloorPrice(min) {
        this.flrPrice = min;
    }

    setCeilPrice(max) {
        this.cilPrice = max;
    }

    get floorPrice() {
        return this.flrPrice;
    }

    get ceilPrice() {
        return this.cilPrice;
    }

    modifyResult(params: string, res) {
         res = this.customizeResponse(res);
        const paramValArr = [];
        for (const param of params.split(',')) {
            // const key = param.substr(0, param.indexOf("_")); // color
            const val = param.substr((param.indexOf('_') + 1), param.length); // black
            paramValArr.push(val);
        }
        // console.log('paramValArr::::::::', paramValArr);
        for (const primaryFacet of res.primaryFacets) {
            for (const s of primaryFacet.secondaryFacets) {
                if (paramValArr.includes(s.key) ) {
                    s.highlight = true;
                }
            }
        }
        return res;
    }

    isShowLoadMore(): boolean {
        return this.searchResult.length === this.searchResultCount;
    }

    showLocation(item: Search): string {
        if (item.location && item.location.addressLine) {
            const address: string = item.location.addressLine;
            return address.includes(',') ?
            address.slice(0, (address.indexOf(',')))
          : address;
        }
        return null;
    }

    isSearchResultPresent(): boolean {
        return this.searchResultCount > 0;
    } 

    modifyQueryParams(optionalParams: string): string {
        // console.log('Optional Params:::::: ', optionalParams);
        // if(optionalParams.includes('Price')) {
        //     return optionalParams;
        // }
        // Brand_Toyta,color_Black,color_Blue
        if(optionalParams) {
            const optionalParamsArr: string[] = optionalParams.split(','); //  ["Brand_Toyta", "color_Black", "color_Blue"]
            let responseObj = {};
            let responseArr: string[] = [];
            optionalParamsArr.forEach((param:string) => {
                const paramArr: string[] = param.split("_"); // ["Brand", "Toyta"]
                if(responseObj[paramArr[0]] === undefined) {
                    responseObj[paramArr[0]] = paramArr[1];
                } else {
                    let paramVal: string = responseObj[paramArr[0]];
                    //responseObj[paramArr[0]] = `${paramVal},${paramArr[1]}`;
                    // pipe introduced for separate same facet values
                     responseObj[paramArr[0]] = `${paramVal}|${paramArr[1]}`;
                }            
            });
            for (let [key, value] of Object.entries(responseObj)) {
                // console.log(key, value);
                const res: string = `${key}_${value}`;
                responseArr.push(res)
            }
            if(responseArr.length) {
                optionalParams = responseArr.join("~");
            }
        }
        return encodeURI(optionalParams);
    }    
}
