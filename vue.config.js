const path = require('path');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                includePaths: [
                    path.resolve(__dirname, './node_modules'),
                ],
            },
        },
    },

    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
};
