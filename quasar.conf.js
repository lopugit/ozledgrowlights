// Configuration for your app
var path = require('path')
var fs = require('fs')
var smarts = require('smarts')()
// var utils = require('utils')

module.exports = function (ctx) {
  var apiDomain = 'src'
  let env = {}
  smarts.gosmart(env, 'level', smarts.getsmart(process, 'env.level', 'dev'))
  smarts.gosmart(env, 'apiProtocol', smarts.getsmart(process, 'env.apiProtocol', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'https://' : 'https://'))
  smarts.gosmart(env, 'apiSubdomain', smarts.getsmart(process, 'env.apiSubdomain', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'api' : 'api'))
  smarts.gosmart(env, 'apiDomain', smarts.getsmart(process, 'env.apiDomain', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'growlights' : 'growlights'))
  smarts.gosmart(env, 'apiTLD', smarts.getsmart(process, 'env.apiTLD', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'com.au' : 'src'))

  // add helper for apiUrl built path
  smarts.setsmart(env, 'apiUrl', `"${env.apiProtocol}${env.apiSubdomain}.${env.apiDomain}.${env.apiTLD}"`)
  // escape for some retarded reason
  smarts.setsmart(env, 'level', `"${smarts.getsmart(env, 'level', 'dev')}"`)
  smarts.setsmart(env, 'apiProtocol', `"${smarts.getsmart(env, 'apiProtocol', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'https://' : 'https://')}"`)
  smarts.setsmart(env, 'apiSubdomain', `"${smarts.getsmart(env, 'apiSubdomain', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'api' : 'api')}"`)
  smarts.setsmart(env, 'apiDomain', `"${smarts.getsmart(env, 'apiDomain', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'growlights' : 'growlights')}"`)
  smarts.setsmart(env, 'apiTLD', `"${smarts.getsmart(env, 'apiTLD', smarts.getsmart(env, 'level', 'dev') == 'prod' ? 'com.au' : 'src')}"`)

  console.log(env)
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
      'circular-json',
      'vue-awesome',
      'vue-img-inputer',
      'vuedraggable',
      'vue-socket.io',
      'vue-select',
      'vue-resource',
      'vue2-medium-editor',
      'vue-uuid',
      'eventHub',
      'globalCss',
			'facebook-login',
			'google-login',
			'firebase',
			'firebaseui',
			'env',
			'smarts',
			'firestore',
			'ua-parser',
      'webpackDev',
      'propThings',
      // 'uuid',
			'grow.ai',
      'lopu3',
      'flatted',
      'vuelidate',
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      all: true, // --- includes everything; for dev only!
      // components: [
      //   'QLayout',
      //   'QHeader',
      //   'QDrawer',
      //   'QPageContainer',
      //   'QPage',
      //   'QToolbar',
      //   'QToolbarTitle',
      //   'QBtn',
      //   'QIcon',
      //   'QList',
      //   'QItem',
      //   'QItemSection',
      //   'QItemLabel'
      // ],

      // directives: [
      //   'Ripple'
      // ],

      // // Quasar plugins
      // plugins: [
      //   'Notify'
      // ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      gzip: true,
      analyze: true,
      // extractCSS: false,
      env,
      extendWebpack (cfg) {
        cfg.resolve.alias['@'] = path.join(__dirname, 'src')
        cfg.module.rules.push(
          {
            test: /\.(cur|ani)$/,
            loader: 'file-loader',
            options: {
                name:  path.join(__dirname, 'src', 'statics/cursors/[name].[hash:7].[ext]'),
            }
          },
				)
				cfg.module.rules.push({
					test: /\.pug$/,
					loader: 'pug-plain-loader'
				})
        // fs.writeFile('debug.js', __dirname+"\n"+JSON.stringify(cfg), err=>{
        //   if(err){
        //     console.log(err)
        //   }
        // })

      }
    },

    devServer: {
      // https: true,
      port: 1337,
      open: false // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: true
    },

    pwa: {
      // cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
