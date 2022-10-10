import {createRouter, createWebHistory, createWebHashHistory } from  'vue-router'
import authenticated from '../middleware/authenticated'
import guest  from '../middleware/guest'


const routes = [

    { 
        path : '/' , name : 'index', component : () => import('../pages/Index.vue'), beforeEnter : authenticated, children : [

            { path: '', name : 'home',   component: () => import('../pages/Home.vue') },

            { path: '/recipe/:id', name :"recipe", component: () => import('../pages/Detail.vue') },
        
            { path: '/create', name : 'create',  component: () => import('../pages/Create.vue') },
        
            { path: '/recipe/edit/:id', name:'edit',  component: () => import('../pages/Edit.vue') }, 
        
            { path: '/search', name : 'search',  component : () => import('../pages/Search.vue')},  
        
            { path: '/user/:id', name : 'user',   component : () => import('../pages/UserRecipe.vue'), children : [
                { path : '' , name : 'user.recipe'  },
                { path : 'saved' , name : 'user.saved',  },
            ], beforeEnter : authenticated},  
        
            { path: '/account', name : 'account', component : () => import('../pages/Account.vue'), children : [
               
                { path : 'edit' , name : 'account.edit', component : () => import('../components/account/Edit.vue') },
                { path : 'security', name : 'account.security', component : () => import('../components/account/Security.vue')}
            ],  beforeEnter : authenticated,   },
        ]
    },
   

    { path: '/login', name:"login", component: () => import('../pages/Login.vue'), beforeEnter : guest  },

    { path: '/register', name : 'register', component: () => import('../pages/Register.vue'), beforeEnter : guest },

    { path: '/account/password/reset', name: 'password.reset', component: () => import('../pages/PasswordReset.vue'), beforeEnter : guest }, 

    { path: '/account/password/reset/:token', name: 'password.change', component: () => import('../pages/ChangePassword.vue'), beforeEnter : guest  },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../components/NotFound.vue')  },

]
  

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes,
    mode: 'hash', 
    linkActiveClass: "active",  
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    }
      
})

export default router;