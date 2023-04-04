import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ListTugas from './ListTugas.vue'
import BaseInput from './components/formtgs/BaseInput.vue'
import BaseSelect from './components/formtgs/BaseSelect.vue'
import BaseRadio from './components/formtgs/BaseRadio.vue'
import BaseRadioGroup from './components/formtgs/BaseRadioGroup.vue'
import BaseCheckbox from './components/formtgs/BaseCheckbox.vue'
import BaseCheckboxGroup from './components/formtgs/BaseCheckboxGroup.vue'

// createApp(App).mount('#app')
const app = createApp(ListTugas);
app.component("base-input", BaseInput)
.component("base-select", BaseSelect)
.component("base-radio", BaseRadio)
.component("base-radio-group", BaseRadioGroup)
.component('base-checkbox',BaseCheckbox)
.component('base-checkbox-group', BaseCheckboxGroup);
app.mount("#app");