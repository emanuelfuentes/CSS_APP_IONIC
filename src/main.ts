import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router';
import mixins from './mixins';

import {
  IonicVue
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
/* Custom Styles */
import './theme/styles.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .mixin(mixins);

router.isReady().then(() => {
  app.mount('#app');
});

// -------------------------------------------------IMPORT IONIC COMPONENTS GLOBALLY-------------------------------------------------

import {
  IonApp,
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonRouterOutlet,
  
  IonTabs,
  IonTabBar,
  IonTabButton,

  IonAvatar,
  IonTitle,
  IonIcon,
  IonLabel,
  IonButtons,
  IonButton,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonSearchbar,

  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,

  IonSegment,
  IonItem,
  IonBadge,
  IonSegmentButton,
  
} from '@ionic/vue';

app.component('ion-app', IonApp);
app.component('ion-page', IonPage);
app.component('ion-content', IonContent);
app.component('ion-header', IonHeader);
app.component('ion-toolbar', IonToolbar);
app.component('ion-router-outlet', IonRouterOutlet);

app.component('ion-tabs', IonTabs);
app.component('ion-tab-bar', IonTabBar);
app.component('ion-tab-button', IonTabButton);

app.component('ion-avatar', IonAvatar);
app.component('ion-title', IonTitle);
app.component('ion-icon', IonIcon);
app.component('ion-label', IonLabel);
app.component('ion-buttons', IonButtons);
app.component('ion-button', IonButton);
app.component('ion-datetime', IonDatetime);
app.component('ion-select', IonSelect);
app.component('ion-select-option', IonSelectOption);
app.component('ion-searchbar', IonSearchbar);

app.component('ion-card', IonCard);
app.component('ion-card-content', IonCardContent);
app.component('ion-card-title', IonCardTitle);
app.component('ion-card-subtitle', IonCardSubtitle);

app.component('ion-segment', IonSegment);
app.component('ion-item', IonItem);
app.component('ion-badge', IonBadge);
app.component('ion-segment-button', IonSegmentButton);