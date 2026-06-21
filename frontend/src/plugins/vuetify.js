import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4A90E2',     // Soft Blue for buttons / primary highlights
        secondary: '#F8FAFC',   // Slate White
        accent: '#82B1FF',      // Pastel Sky for minor highlights / banners
        background: '#FFFFFF',  // Pure White for main background
        error: '#FF5252',
        success: '#4CAF50',
        warning: '#FB8C00',
        info: '#2196F3',
      },
    },
  },
});
