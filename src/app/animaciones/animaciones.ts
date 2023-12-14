import { trigger, query, style, animateChild, group, animate, transition } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => Perfil', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: 'translateY(100%)' })
        // style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms', style({ transform: 'translateY(100%)' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ transform: 'translateY(0)' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),


    transition('* => Login', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: 'translateY(100%)' })
        // style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms', style({ transform: 'translateY(100%)' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ transform: 'translateY(0)' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),


    transition('* => Registro', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: 'translateY(100%)' })
        // style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms', style({ transform: 'translateY(100%)' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ transform: 'translateY(0)' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),


    transition('* => Usuarios', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: 'translateY(100%)' })
        // style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms', style({ transform: 'translateY(100%)' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ transform: 'translateY(0)' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),


    transition('* => Turnos', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: 'translateY(100%)' })
        // style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms', style({ transform: 'translateY(100%)' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ transform: 'translateY(0)' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    
    transition('* => Informes', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: 'translateY(100%)' })
        // style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms', style({ transform: 'translateY(100%)' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ transform: 'translateY(0)' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])

    
  ]);