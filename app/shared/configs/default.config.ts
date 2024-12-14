export const defaultListViewConfig = {
    title: 'Recomanded Offers',
    iconUrlConfig: {
      url: 'assets/images/recom-offer-icon.png',
      height: 35,
      width: 25,
      class: 'gt-img-responsive'
    },
    isActionButton: false,
    actionButton: {
      label: 'view all',
    },
    items: [],
    isBreadCrumbRequired: false,
    breadCrumbText: 'Recomanded Offers',
    isPaginationRequired: false,
    paginationConfig: {
      itemsPerPage: 1, 
      currentPage: 1, 
      id: 'first' ,
      totalItems: 10
    }
  }

  export const defaultNoImage = 'assets/images/create-offer/uplaod-default-img.png'
  export const defaultErrorImage = 'assets/images/no-image.png'

  export enum DeafaultOfferCommenttNoImage {
    commentSection = 'assets/images/user-default-img/chatu-noimg.svg',
    replySection = 'assets/images/user-default-img/chatu-noimg.svg',
  }

  export enum DeafaultChatProfiletNoImage {
     dealSection = 'assets/images/user-default-img/chatu-noimg.svg',
     msgSection = 'assets/images/user-default-img/chatu-noimg.svg',
     selectedUserSection = 'assets/images/user-default-img/chatu-noimg.svg',
     userListSection =  'assets/images/user-default-img/chatu-noimg.svg',
     businessDetails =  'assets/images/user-default-img/chatu-noimg.svg'
  }
