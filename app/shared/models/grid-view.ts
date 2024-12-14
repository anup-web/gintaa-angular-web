export interface GridViewConfig {
    title: string;
    userId?:string;
    iconUrlConfig?: {
      url: string,
      height: number,
      width: number,
      class: string,
      flag: boolean,
    };
    materialIconConfig?: {
      iconType?: string;
      class: string;
      flag: boolean;
    };
    actionButton?: {
      flag: boolean,
      label: string,
      hrefLink?: string,
    },
    items: any[]
  }