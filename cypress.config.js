const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'Relatório',
    embeddedScreenshots: true,
    inlineAssets: true,
    retries: {
    openMode: 0,
    runMode: 2
  },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // registra o plugin que gera/mescla os relatórios
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    }
  }
})
