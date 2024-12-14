export interface ListViewConfig {
    title: string;
    iconUrlConfig: {
      url: string,
      height: number,
      width: number,
      class: string,
    };
    isActionButton?: boolean,
    actionButton?: {
      label: string,
      hrefLink?: string,
    },
    items: any[],
    isBreadCrumbRequired: boolean,
    breadCrumbText: string,
    isPaginationRequired: boolean,
    paginationConfig: {
      itemsPerPage: number, 
      currentPage: number, 
      id: string,
      totalItems: number
    }
  }