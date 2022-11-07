import Vue from 'vue';
import VueRouter from 'vue-router';
import FreetsPage from './components/Freet/FreetsPage.vue';
import SingleFreetPage from './components/Freet/SingleFreetPage.vue';
import LikePage from './components/Like/LikePage.vue';
import UserProfilePage from './components/User/UserProfilePage.vue';
import UserFollowings from './components/Follow/UserFollowings.vue';
import UserFollowers from './components/Follow/UserFollowers.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: FreetsPage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/liked', name: 'Liked', component: LikePage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/freet/:freetId', name:'Freet', component: SingleFreetPage},
  {path: '/user/:user', name:'UserProfilePage', component: UserProfilePage},
  {path: '/user/:user/followings', name:'UserFollowings', component: UserFollowings},
  {path: '/user/:user/followers', name:'UserFollowers', component: UserFollowers},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === 'Account' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
  }

  next();
});

export default router;
