// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui';


Vue.config.productionTip = false

/* ElementUI --start */
import { Dropdown, DropdownMenu, DropdownItem, MessageBox, Message, Menu, MenuItem, Collapse, CollapseItem, Form, FormItem, InputNumber, Input, Switch, Select, Option, Table, TableColumn, Button } from 'element-ui';

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(InputNumber);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
/* ElementUI --end */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
