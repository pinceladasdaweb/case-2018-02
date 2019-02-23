import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Users from '@/components/users/Users'
import Doctors from '@/components/doctors/Doctors'
import Medicines from '@/components/medicines/Medicines'
import Drugs from '@/components/drugs/Drugs'
import Integrations from '@/components/integrations/Integrations'
import Prescriptions from '@/components/prescriptions/Prescriptions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/', name: 'Home', component: Home },
    { path: '/users', name: 'Users', component: Users },
    { path: '/doctors', name: 'Doctors', component: Doctors },
    { path: '/medicines', name: 'Medicines', component: Medicines },
    { path: '/drugs', name: 'Drugs', component: Drugs },
    { path: '/integrations', name: 'Integrations', component: Integrations },
    { path: '/prescriptions', name: 'Prescriptions', component: Prescriptions }
  ]
})
