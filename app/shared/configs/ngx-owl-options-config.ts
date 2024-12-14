
import { OwlOptions } from 'ngx-owl-carousel-o';

const responsive = {
  0: {
    items: 1
  },
  400: {
    items: 2
  },
  740: {
    items: 3
  },
  940: {
    items: 6
  }
};
const responsive4 = {
  0: {
    items: 1
  },
  400: {
    items: 2
  },
  740: {
    items: 4
  },
  940: {
    items: 4
  }
};
const responsive2 = {
  0: {
    items: 1
  },
  400: {
    items: 1
  },
  740: {
    items: 2
  },
  940: {
    items: 2
  }
};
const sharedConfig = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  margin:15,
  navSpeed: 700,
  navText: ['', ''],
  nav: true,
}
export const defaultOwlOptions: OwlOptions = {
  ...sharedConfig,
  responsive: responsive,
}

export const defaultOwlOptions2: OwlOptions = {
  ...sharedConfig,
  responsive: responsive2,
}

export const defaultOwlOptions4: OwlOptions = {
  ...sharedConfig,
  responsive: responsive4,
}