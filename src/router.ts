import Vue from 'vue';
import Router from 'vue-router';
import Login from 'view/login.vue';
import Register from 'view/register.vue';
import Chat from 'view/chat.vue';
import Home from 'view/home.vue'

Vue.use(Router);


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: {
          name: 'login'
      },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/chat',
        name:'chat',
        component: Chat

    }
  ],
});

router.beforeEach((to, from, next) => {
    console.log(to, from,'-')
    if (window.localStorage.uid) {
        if (to.name == 'chat' && to.params.uid) {
            next()
            setTimeout(() => {
                window.scrollTo({ 
                    top: window.screen.height + 9999, 
                    behavior: "smooth" 
                });
            }, 500);
        } else {
            if (to.name == 'home') {
                next();
            } else {
                next({
                    name: 'home'
                })
            }
        }
    } else {
        if (to.name == 'login') {
            next();
        } else {
            next({
                name: 'login'
            })
        }
    }
})

export default router;