export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  target: 'static',
  loading: '~/components/LoadingBar.vue',
  loadingIndicator: {
    name: 'three-bounce',
    color: '#3B8070',
    background: 'white'
  },
  head: {
    title: 'EFContact Administration',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/assets/images/neptune.png' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp' }
    ],

    script: [
      {
        src: "/assets/plugins/jquery/jquery-3.5.1.min.js",
        type: "text/javascript",
        body: true
      },
      {
        src: "/assets/plugins/bootstrap/js/bootstrap.min.js",
        type: "text/javascript",
        body: true
      },
      {
        src: "/assets/plugins/perfectscroll/perfect-scrollbar.min.js",
        type: "text/javascript",
        body: true
      },
      {
        src: "/assets/plugins/jquery/jquery-3.5.1.min.js",
        type: "text/javascript",
        body: true
      },
      {
        src: "/assets/plugins/pace/pace.min.js",
        type: "text/javascript",
        body: true
      },
      {
        src: "/assets/plugins/apexcharts/apexcharts.min.js",
        type: "text/javascript",
        body: true
      },
      {
        src: "/assets/js/main.min.js",
        type: "text/javascript",
        body: true
      },
      {
        src: "/assets/js/custom.js",
        type: "text/javascript",
        body: true
      },
      {
        src: "/assets/js/pages/dashboard.js",
        type: "text/javascript",
        body: true
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/plugins/bootstrap/css/bootstrap.min.css',
    '~/assets/plugins/perfectscroll/perfect-scrollbar.css',
    '~/assets/plugins/pace/pace.css',
    '~/assets/css/main.min.css',
    '~/assets/css/custom.css',

    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/splide.client.js', ssr: false },
    { src: '~/plugins/vue-quill-editor.js', ssr: false },
    '~/plugins/vuecarousel.client.js',
    '~/plugins/vueslidetoggle.client.js',
    '~/plugins/vuelidate.client.js',
    '~/plugins/vuestepwizard.client.js',
    '~/plugins/formatingDate.client.js',
    '~/plugins/paystack.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/layouts',
      // '~/components/dashboard',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // With options
    ['@nuxtjs/laravel-echo', {
      broadcaster: 'pusher',
      key: process.env.MIX_PUSHER_APP_KEY,
      cluster: process.env.MIX_PUSHER_APP_CLUSTER,
      encrypted: false,
      wsHost: process.env.WEBSOCKET_BASE_URL,
      wsPort: 6001,
      authEndpoint: process.env.MIX_PUSHER_APP_AUTH_ENDPOINT_URL,
      forceTLS: false,
      disableStats: true,
      authModule: true,
      connectOnLogin: true,
    }]
  ],

  echo: {
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true,
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],

  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  axios: {
    proxy: true,
    // baseURL: process.env.API_BASE,
    baseURL: process.env.API_BASE,
    // credentials: true,
  },

  proxy: {
    "/_backend": {
      // target: process.env.API_BASE,
      target: process.env.API_BASE,
      pathRewrite: { "^/_backend": "" },
    },
  },

  publicRuntimeConfig: {
    axios: {
      // browserBaseURL: process.env.BROWSER_BASE_URL
      browserBaseURL: process.env.API_BASE
    }
  },

  privateRuntimeConfig: {
    axios: {
      // baseURL: process.env.BASE_URL
      baseURL: process.env.API_BASE
    }
  },

  router: {
    middleware: ['auth']
  },

  // authentication stratagies
  auth: {
    redirect: {
      login: '/login', // User will be redirected to this path if login is required.
      logout: '/login', // User will be redirected to this path if after logout, current route is protected.
      // callback: false, // User will be redirected to this path by the identity provider after login.
      home: '/user/dashboard' // User will be redirected to this path after login.
    },

    rewriteRedirects: true,

    strategies: {
      local: {
        token: {
          property: 'auth_token',
          global: true,
          // required: true,
          type: 'Bearer'
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/user/login', method: 'post' },
          logout: { url: '/user/logout', method: 'post' },
          user: { url: '/user/profile', method: 'get' },
        }
      }
    }
  }
}
