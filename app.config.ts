export default {
  name: 'KICL Mobile App',
  slug: 'kicl-mobile-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.kicl.mobile'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/favicon.png',
      backgroundColor: '#FFFFFF'
    },
    package: 'com.kicl.mobile'
  },
  web: {
    favicon: './assets/images/favicon.png',
    bundler: 'metro'
  },
  extra: {
    apiUrl: 'https://devkicl.duckdns.org/api'
  },
  plugins: []
};