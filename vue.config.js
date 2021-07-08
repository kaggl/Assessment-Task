module.exports = {
  publicPath: '/Assessment-Task/',
  runtimeCompiler: true,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'de',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  }
}
