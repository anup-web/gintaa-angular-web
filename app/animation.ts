import { trigger, transition, style, animate, query, state, keyframes, group, animation, AnimationTriggerMetadata, AUTO_STYLE, stagger } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('600ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('600ms', style({ opacity: 0 }))]
  )
]);

export const divState = trigger('divState', [
  state('normal', style({
    'background-color': 'red',
    transform: 'translateX(0)'
  })),
  state('highlighted', style({
    'background-color': 'blue',
    transform: 'translateX(100px)'
  })),
  transition('normal <=> highlighted', animate(300)),
  //transition('highlighted => normal', animate(800)),
]);

export const wildState = trigger('wildState', [
  state('normal', style({
    'background-color': 'red',
    transform: 'translateX(0) scale(1)'
  })),
  state('highlighted', style({
    'background-color': 'blue',
    transform: 'translateX(100px) scale(1)'
  })),
  state('shrunken', style({
    'background-color': 'green',
    transform: 'translateX(0) scale(0.5)'
  })),
  transition('normal => highlighted', animate(300)),
  transition('highlighted => normal', animate(800)),
  transition('shrunken <=> *', [
    style({
      'background-color': 'orange'
    }),
    animate(1000, style({
      borderRadius: '50px'
    })),
    animate(500)
  ])
]);

// export const slideInOut = trigger('slideInOut', [
//   state('in', style({
//     opacity: 1,
//     transform: 'translateX(0)'
//   })),
//   transition('void => *', [
//     style({
//       opacity: 0,
//       transform: 'translateX(100px)'
//     }),
//     animate(300)
//   ]),
//   transition('* => void', [    
//     animate(300, style({
//       transform: 'translateX(-100px)',
//       opacity: 0
//     }))
//   ]),
// ]);

export const slideInOutSmooth = trigger('slideInOutSmooth', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [    
    animate(1000, keyframes([
      style({
        transform: 'translateX(-100px)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'translateX(-50px)',
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        transform: 'translateX(-20px)',
        opacity: 1,
        offset: 0.8
      }),
      style({
        transform: 'translateX(0)',
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  transition('* => void', [ 
    group([
      animate(300, style({
        color: 'red'
      })),
      animate(800, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ]),
]);

export const slideUpDown = trigger('slideUpDown', [
  state('in', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateY(-100px)'
    }),
    animate(300)
  ]),
  transition('* => void', [    
    animate(300, style({
      transform: 'translateY(100px)',
      opacity: 0
    }))
  ]),
]);

export const slideUpDownSmooth = trigger('slideUpDownSmooth', [
  state('true, false', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition('false <=> true, :enter', [    
    animate(1000, keyframes([
      style({
        transform: 'translateY(-100px)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'translateY(-50px)',
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        transform: 'translateY(-20px)',
        opacity: 1,
        offset: 0.8
      }),
      style({
        transform: 'translateY(0)',
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  transition(':leave', [ 
    // group([
    //   animate(300, style({
    //     color: 'red'
    //   })),
      animate(800, style({
        transform: 'translateY(100px)',
        opacity: 0
      }))
    //])
  ]),
]);

export const chatModalUpDownSmooth = trigger('dialog', [
  state('open', style({
    //width: '250px',
    opacity: 1,
    //backgroundColor: 'yellow',
  })),
  state('closed', style({
    //width: '100px',
    opacity: 0.5,
    backgroundColor: 'green'
  })),
  transition('void => *', [
    style({ transform: 'scale3d(.3, .3, .3)' }),
    animate(100)
  ]),
  transition('* => void', [
    animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
  ])
])

export const btnInsertRemove = trigger('btnInsertRemove', [
  state('open', style({
    opacity: 1
  })),
  state('closed', style({
    opacity: 0
  })),
  transition('closed => open', [  
    animate(1000, keyframes([
      style({
        transform: 'translateY(-100px)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'translateY(-50px)',
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        transform: 'translateY(-20px)',
        opacity: 1,
        offset: 0.8
      }),
      style({
        transform: 'translateY(0)',
        opacity: 0,
        offset: 1
      })
    ]))
  ])
])

export const btnFadeInOut = trigger('btnFadeInOut', [
  state('open', style({
    opacity: 1
  })),
  state('closed', style({
    opacity: 0.5
  })),
  transition('closed => open', [  
    animate('0.5s', keyframes([
      style({
        opacity: 0.3,
        offset: 0
      }),
      style({
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        opacity: 0.8,
        offset: 0.8
      }),
      style({
        opacity: 1,
        offset: 1
      })
    ]))
  ])
]);

export const slideInDown = trigger('slideInDown', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(100px)'
    }),
    animate(300)
  ]),
  transition('* => void', [    
    animate(300, style({
      transform: 'translateX(-100px)',
      opacity: 0
    }))
  ]),
]);


export const slideInRight = trigger('slideInRight', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateY(100px)'
    }),
    animate(300)
  ]),
  transition('* => void', [    
    animate(300, style({
      transform: 'translateY(-100px)',
      opacity: 0
    }))
  ]),
]);

// ===========================================bounce entrances================================


export const bounceInup = trigger('bounceInUp', [

]
);


export const bounceIn = trigger('bounceIn', [

]);


export const bounceInLeft = trigger('bounceInleft', [

]);

export const bounceInright = trigger('bounceInright', [

]);

export const bounceInDown = trigger('bounceInDown', [

]);


// ===========================================sliding entrances================================

export const slideInUp = trigger('slideInUp', [

  state('in', style({
    opacity: 1,
  })),

  transition('void => *', [
    animate(
      1000,
      keyframes([
        style({ visibility: 'visible', transform: 'translate3d(0, {{translate}}, 0)', easing: 'ease', offset: 0 }),
        style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 })
      ])
    )
  ]),

  transition('* => void', [
    animate(
      1000,
      keyframes([
        style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
        style({ transform: 'translate3d(0, {{translate}}, 0)', visibility: 'hidden', easing: 'ease', offset: 1 })
      ])
    )
  ]),

]);

export const slideInLeft = trigger('slideInLeft', [

]);

// ===========================================Attention seekers================================

export const bounce = trigger('bounce', [

  
  

]);




export const headShake = trigger('headShake', [

  state('in', style({
    opacity:1,
  })),

  transition('void => *', [
    animate(
      '1s',
      keyframes([
        style({ visibility: AUTO_STYLE, transform: 'translateX(0)', easing: 'ease-in-out', offset: 0 }),
        style({ transform: 'translateX(-6px) rotateY(-9deg)', easing: 'ease-in-out', offset: 0.065 }),
        style({ transform: 'translateX(5px) rotateY(7deg)', easing: 'ease-in-out', offset: 0.185 }),
        style({ transform: 'translateX(-3px) rotateY(-5deg)', easing: 'ease-in-out', offset: 0.315 }),
        style({ transform: 'translateX(2px) rotateY(3deg)', easing: 'ease-in-out', offset: 0.435 }),
        style({ transform: 'translateX(0)', easing: 'ease-in-out', offset: 0.5 })
      ])
    )

  ]),

  transition('* => void', [
    animate(
      '1s',
      keyframes([
        style({ visibility: AUTO_STYLE, transform: 'translateX(0)', easing: 'ease-in-out', offset: 0 }),
        style({ transform: 'translateX(-6px) rotateY(-9deg)', easing: 'ease-in-out', offset: 0.065 }),
        style({ transform: 'translateX(5px) rotateY(7deg)', easing: 'ease-in-out', offset: 0.185 }),
        style({ transform: 'translateX(-3px) rotateY(-5deg)', easing: 'ease-in-out', offset: 0.315 }),
        style({ transform: 'translateX(2px) rotateY(3deg)', easing: 'ease-in-out', offset: 0.435 }),
        style({ transform: 'translateX(0)', easing: 'ease-in-out', offset: 0.5 })
      ])
    )
  ])
  
]);


export const heartBeat = trigger('heartBeat', [
  
]);

export const pulse = trigger('pulse', [

  state('in', style({
    opacity:1,
  }) ),

  transition('void => *', [
    animate(
      '1s',
      keyframes([
        style({ visibility: AUTO_STYLE, transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 0 }),
        style({ transform: 'scale3d({{scale}}, {{scale}}, {{scale}})', easing: 'ease', offset: 0.5 }),
        style({ transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 1 })
      ])
    )
  ]),


  transition('* => void', [
    animate(
      '1s',
      keyframes([
        style({ visibility: AUTO_STYLE, transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 0 }),
        style({ transform: 'scale3d({{scale}}, {{scale}}, {{scale}})', easing: 'ease', offset: 0.5 }),
        style({ transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 1 })
      ])
    )
  ]),
  
]);


export const flash = trigger('flash', [
  state('in', style({
    opacity: 1,
  })),

  transition('void => *', [
    animate(1000, 
      keyframes([
        style({ visibility: AUTO_STYLE, opacity: 1, easing: 'ease', offset: 0 }),
        style({ opacity: 0, easing: 'ease', offset: 0.25 }),
        style({ opacity: 1, easing: 'ease', offset: 0.5 }),
        style({ opacity: 0, easing: 'ease', offset: 0.75 }),
        style({ opacity: 1, easing: 'ease', offset: 1 })
      ])
      )
  ]),

  transition('* => void', [
    animate(1000, 
      keyframes([
        style({ visibility: AUTO_STYLE, opacity: 1, easing: 'ease', offset: 0 }),
        style({ opacity: 0, easing: 'ease', offset: 0.25 }),
        style({ opacity: 1, easing: 'ease', offset: 0.5 }),
        style({ opacity: 0, easing: 'ease', offset: 0.75 }),
        style({ opacity: 1, easing: 'ease', offset: 1 })
      ])
      )

  ]),
  
]);


export const slideInOut = trigger('slideInOut', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(100px)'
    }),
    animate(300)
  ]),
  transition('* => void', [    
    animate(300, style({
      transform: 'translateX(-100px)',
      opacity: 0
    }))
  ]),
]);

export const swing = trigger('swing', [

  state('in', style({
    opacity:1,
  })),

  transition('void => *',[
    animate(
      '1s',
      keyframes([
        style({ 'transform-origin': 'top center', offset: 0 }),
        style({ visibility: AUTO_STYLE, transform: 'rotate3d(0, 0, 1, 0deg)', easing: 'ease', offset: 0 }),
        style({ transform: 'rotate3d(0, 0, 1, 15deg)', easing: 'ease', offset: 0.2 }),
        style({ transform: 'rotate3d(0, 0, 1, -10deg)', easing: 'ease', offset: 0.4 }),
        style({ transform: 'rotate3d(0, 0, 1, 5deg)', easing: 'ease', offset: 0.6 }),
        style({ transform: 'rotate3d(0, 0, 1, -5deg)', easing: 'ease', offset: 0.8 }),
        style({ transform: 'rotate3d(0, 0, 1, 0deg)', easing: 'ease', offset: 1 }),
        style({opacity: 0})
      ])
    )
  ]),
  transition('* => void',[
    animate(
      '1s',
      keyframes([
        style({ 'transform-origin': 'top center', offset: 0 }),
        style({ visibility: AUTO_STYLE, transform: 'rotate3d(0, 0, 1, 0deg)', easing: 'ease', offset: 0 }),
        style({ transform: 'rotate3d(0, 0, 1, 15deg)', easing: 'ease', offset: 0.2 }),
        style({ transform: 'rotate3d(0, 0, 1, -10deg)', easing: 'ease', offset: 0.4 }),
        style({ transform: 'rotate3d(0, 0, 1, 5deg)', easing: 'ease', offset: 0.6 }),
        style({ transform: 'rotate3d(0, 0, 1, -5deg)', easing: 'ease', offset: 0.8 }),
        style({ transform: 'rotate3d(0, 0, 1, 0deg)', easing: 'ease', offset: 1 })
      ])
    )
  ]),
  
]);

export const fadeInUp = trigger('fadeInUp', [
  state('in', style({
    opacity:1,
  })),

  transition('void => *', [
    animate(
      '1s',
      keyframes([
        style({ visibility: 'visible', opacity: 0, transform: 'translate3d(0, {{translate}}, 0)', easing: 'ease', offset: 0 }),
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 })
      ])
    ) 
  ]),

  transition('* => void', [
    animation([
      animate(
        '1s',
        keyframes([
          style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
          style({ opacity: 0, transform: 'translate3d(0, -{{translate}}, 0)', easing: 'ease', offset: 1 })
        ])
      )
    ]),
  ])


])

export const fadeIn = trigger('fadeIn', [
    state('in', style({
      opacity:1,
    })),

    transition('void => *', [
      style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))
    ]),

    transition('* => void', [
      style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))
    ])
]);

export const fadeInt = trigger('fadeInt', [
  state('in', style({
    opacity:1,
    'height': '85px'
  })),

  transition('void => *', [
    style({ opacity: 0,   }), 
    animate('400ms ease-in-out', 
    style({ opacity: 1, height:'85px' }))
  ]),

  transition('* => void', [
    style({ opacity: 1 }), animate('400ms ease-in-out', style({ opacity: 0, height:'85px' }))
  ])
]);


export const slideInDownd = trigger('slideInDownd', [
  state('in', style({
    'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
  })),
  state('out', style({
      'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
  })),
  transition('in => out', [group([
      animate('400ms ease-in', style({
          'opacity': '0'
      })),
      animate('600ms ease-in', style({
          'max-height': '0px'
      })),
      animate('700ms ease-in-out', style({
          'visibility': 'hidden'
      }))
  ]
  )]),
  transition('out => in', [group([
      animate('1ms ease-in-out', style({
          'visibility': 'visible'
      })),
      animate('600ms ease-in', style({
          'max-height': '500px'
      })),
      animate('800ms ease-in', style({
          'opacity': '1'
      }))
  ]
  )])

]);


// export const slideTog = trigger('slideTog', [
//   transition(':enter', [
//     style({ opacity: 0 }), animate('600ms ease-in-out', style({ opacity: 1, 'height': '85px' }))]
//   ),
//   transition(':leave',
//     [style({ opacity: 1 }), animate('600ms ease-in-out', style({ opacity: 0,  }))]
//   )
// ]);

export const simpleFadeAnimation = trigger('simpleFadeAnimation', [

  state('in', style({opacity: 1})),

 transition(':enter', [
        style({opacity: 0}),
        animate(200)
      ]),
      transition(':leave',
      animate(200, style({opacity: 0})))
  
]);
