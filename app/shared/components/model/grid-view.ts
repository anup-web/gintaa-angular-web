export interface GridViewConfig {
    title: string;
    iconUrlConfig?: {
      url: string,
      height: number,
      width: number,
      class: string,
      flag?: boolean
    };
    isActionButton?: boolean;
    actionButton?: {
      label: string,
      hrefLink?: string,
    },
    items: any[]
  }