import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./style/style.scss";
import locale from 'element-ui/lib/locale/lang/en'
import * as VueGoogleMaps from 'vue2-google-maps'
import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';

Vue.component(HistogramSlider.name, HistogramSlider);
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCs-QKtNa_l3qyNxdpxi7YM7rRgpKvTJU8',
        libraries: 'places',
    },
})

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')