// Configuration for your app

module.exports = function (ctx) {
  const optionDefinitions = [
    { name: 'application', alias: 'a', type: String, defaultValue: '' },
    { name: 'appurl', alias: 'r', type: String, defaultValue: '' },
    { name: 'devport', alias: 'd', type: Number, defaultValue: 8080 },
    { name: 'verbose', alias: 'v', type: Boolean, defaultValue: false }
  ]
  const commandLineArgs = require('command-line-args')
  const options = commandLineArgs(optionDefinitions, {partial: true})
  // console.log(options)
  if (options.application === '') {
    console.log('unknown application')
    process.exit(1)
  }
  if (options.appurl === '') {
    console.log('empty appurl')
    process.exit(1)
  }
  console.log('app: ' + options.application)
  console.log('appurl: ' + options.appurl)
  console.log(ctx)
  const appenv = ctx.dev
    ? { // so on dev we'll have
      MAIN_API_SRC: JSON.stringify('https://dev.api.com/')
    }
    : { // and on build (production):
      MAIN_API_SRC: JSON.stringify('https://prod.api.com/')
    }
  appenv['MAIN_APPLICATION'] = JSON.stringify(options.application)
  appenv['MAIN_APPURL'] = JSON.stringify(options.appurl)
  appenv['MAIN_VERBOSE'] = JSON.stringify(options.verbose)
  return {
    plugins: [
      'main',
      'routing',
      'i18n',
      'addressbar-color',
      'axios',
      'icorapi'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      // 'ionicons',
      'mdi',
      'fontawesome'
    ],
    preFetch: true,
    supportIE: false,
    build: {
      scopeHoisting: true,
      publicPath: '',
      vueRouterMode: 'hash', // history - need nginx configuration
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      htmlFilename: 'index.html',
      vueCompiler: true,
      env: appenv,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
        // ustalenie adresu bazowego dla API
        /*
        var wc = false
        for (var i = 0; i < cfg.plugins.length; i++) {
          if (cfg.plugins[i].constructor.name === 'DefinePlugin') {
            cfg.plugins[i].definitions['MAIN_API']=JSON.stringify("http://api02.com/")
            wc = true
          }
        }
        if (!wc) {
          throw 'build.extendWebpack(cfg.plugins) musi miec zdefiniowany webpack.DefinePlugin'
        }
        */
      }
    },
    devServer: {
      https: true,
      port: options.devport,
      proxy: [{
        // proxy all requests starting with /api to jsonplaceholder
        context: ['/icormanager', '/icorlib', '/icorimg', '/wwwdata'],
        target: 'http://localhost:9180',
        secure: false,
        changeOrigin: true,
        /*
        cookieDomainRewrite: {
          'localhost': 'localhost:8080',
          '*': 'localhost:8080'
        },
        */
        cookiePathRewrite: {
          '/icormanager': '/',
          '*': '/'
        },
        headers: {
          // 'Quasar-Proxy2': 'YYY'
        },
        pathRewrite: {
          // '^/api': ''
        }
      }],
      open: false // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      i18n: 'pl',
      components: [
        'QActionSheet',
        'QAjaxBar',
        'QAutocomplete',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QBtn',
        'QBtnDropdown',
        'QBtnGroup',
        'QBtnToggle',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl',
        'QCheckbox',
        'QChip',
        'QCollapsible',
        'QDatetime',
        'QEditor',
        'QField',
        'QIcon',
        'QInput',
        'QItem',
        'QItemMain',
        'QItemSeparator',
        'QItemSide',
        'QItemTile',
        'QLayout',
        'QLayoutDrawer',
        'QLayoutHeader',
        'QList',
        'QListHeader',
        'QModal',
        'QModalLayout',
        'QPage',
        'QPageContainer',
        'QPageSticky',
        'QPagination',
        'QPopover',
        'QRadio',
        'QRange',
        'QRouteTab',
        'QScrollArea',
        'QSearch',
        'QSelect',
        'QSlider',
        'QStep',
        'QStepper',
        'QStepperNavigation',
        'QTab',
        'QTable',
        'QTableColumns',
        'QTabPane',
        'QTabs',
        'QTd',
        'QTh',
        'QToggle',
        'QToolbar',
        'QToolbarTitle',
        'QTooltip',
        'QTr',
        'QUploader'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      plugins: [
        'Meta',
        'ActionSheet',
        'AddressbarColor',
        'Dialog',
        'Notify',
        'Loading',
        'LocalStorage'
      ]
    },
    // animations: 'all' --- includes all animations
    animations: [
    ],
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'ICORManager',
        short_name: 'ICORManager',
        description: 'ICOR panel admina i operatora',
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
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.2'
  }
}
