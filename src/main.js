import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';


// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});


createApp(App).use(VMdEditor).use(VMdPreview).use(router).use(Antd).mount('#app')
