import colors from 'vuetify/es5/util/colors';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

// vuetify.options.js
export default function({ store }) {
  return {
    icons: {
      iconfont: 'mdi'
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: '#34358e'
        }
      }
    }
  };
}
