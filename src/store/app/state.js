let uuid = require('uuid/v4')
let $f = require('flatted')
let state = {
  fbParams: {
    scope: 'email,public_profile',
    return_scopes: true
  },
  googleParams: {
    client_id: '278663639558-du8pit378au8cvkm22s1vv02be65dmru.apps.googleusercontent.com'
  },
  schemas: {},
	feedback: [],
	dialog: [],
	entityDefault: {
		alopu: {
			username: undefined,
			password: undefined
    },
    registered: {
      any: false
    }
	},
	userAgent: navigator.userAgent,
	env: window.env,
	clientId: undefined,
	passwordConfirmation: '',
	authLogs: [],
	pageHistory: [],
	showLoginOptions: true,
	leftSidebar: false,
  cartSidebar: false,
	navigation: {
    general: [
      {
        name: 'home',
        link: '/home',
        icon: 'store.png'
      },
      {
        name: 'grow lights',
        link: '/products/grow lights',
        icon: 'hothouse.png'
      },
      {
        name: 'grow rooms',
        link: '/products/grow rooms',
        icon: 'green-house.png'
      },
      {
        name: 'grow kits',
        link: '/products/grow kits',
        icon: 'stock.png'
      },
      {
        name: 'additives',
        link: '/products/additives',
        icon: 'research.png'
      },
      {
        name: 'accessories',
        link: '/products/accessories',
        icon: 'smart-farm.png'
      },
    ],
    user: [
      {
        name: 'your orders',
        link: '/orders',
        icon: 'box-handle.png'
      },
      {
        name: 'your inventory',
        link: '/inventory',
        icon: 'store.png'
      },
      {
        name: 'your carts',
        link: '/carts',
        icon: 'trolley.png'
      },
    ]
  }
}
state.entity = $f.parse($f.stringify(state.entityDefault))

export default state
